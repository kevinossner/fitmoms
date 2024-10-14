import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { generateClient } from "aws-amplify/api";
import { Session, Course, Mom } from "../../API";
import { CourseFull } from "../../types/CourseType";
import { CustomSession } from "../../types/SessionType";
import {
  listSessions,
  listCourses,
  registrationsByCourseId,
  getMom,
} from "../../graphql/queries";
import { createSession } from "../../graphql/mutations";
import Ionicons from "@expo/vector-icons/Ionicons";
import SessionCard from "../../components/SessionCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamListType";

const client = generateClient();
LocaleConfig.locales["de"] = {
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "März",
    "Apr.",
    "Mai",
    "Juni",
    "Juli",
    "Aug.",
    "Sept.",
    "Okt.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],
  dayNamesShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  today: "Heute",
};

LocaleConfig.defaultLocale = "de";

const CalendarScreen = () => {
  useFocusEffect(
    useCallback(() => {
      fetchSessions();
      fetchCourses();
      setSelectedDate(formatToEuropeanDate(String(new Date())));
      setSessionsOnDate([]);
    }, [])
  );
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionsOnDate, setSessionsOnDate] = useState<CustomSession[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [courses, setCourses] = useState<CourseFull[]>([]);

  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  async function fetchSessions() {
    try {
      const sessionsQuery = (await client.graphql({
        query: listSessions,
      })) as any;
      const sessions = sessionsQuery.data.listSessions.items as Session[];
      sessions.sort((a, b) => {
        if (a.dateTime < b.dateTime) return -1;
        if (a.dateTime > b.dateTime) return 1;
        return 0;
      });
      const marked: MarkedDates = {};
      sessions.forEach((session) => {
        if (session.dateTime) {
          const formattedDate = formatToEuropeanDate(session.dateTime);
          marked[formattedDate] = { marked: true, dotColor: "#720039" };
        }
      });
      setSessions(sessions);
      setMarkedDates(marked);
    } catch (err) {
      console.log("error fetching sessions:", err);
    }
  }

  async function fetchCourses() {
    try {
      const coursesQuery = await client.graphql({
        query: listCourses,
      });
      const coursesData = coursesQuery.data.listCourses.items as Course[];
      const coursesFull = await Promise.all(
        coursesData.map(async (course) => {
          if (course.id) {
            const registratedMoms = await fetchRegistratedMoms(course.id);
            registratedMoms.sort((a, b) => {
              if (a.lastName < b.lastName) return -1;
              if (a.lastName > b.lastName) return 1;
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
              return 0;
            });
            return {
              id: course.id,
              name: course.name,
              icon: course.icon,
              createdAt: course.createdAt,
              updatedAt: course.updatedAt,
              registratedMoms: registratedMoms,
            } as CourseFull;
          }
          return {
            id: course.id,
            name: course.name,
            icon: course.icon,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            registratedMoms: [],
          } as CourseFull;
        })
      );
      setCourses(coursesFull);
    } catch (err) {
      console.log("error fetching courses:", err);
    }
  }

  async function fetchRegistratedMoms(courseId: string): Promise<Mom[]> {
    try {
      // Step 1: Fetch all registrations by momId
      const registrationsQuery = await client.graphql({
        query: registrationsByCourseId,
        variables: {
          courseId: courseId,
        },
      });

      // Step 2: Extract the list of course IDs from registrations
      const registrations =
        registrationsQuery.data.registrationsByCourseId.items;

      if (!registrations || registrations.length === 0) {
        return [];
      }

      // Step 3: Fetch full course information for each courseId in the registrations
      const momPromises = registrations.map(
        async (registration: { momId: string }) => {
          const momQuery = await client.graphql({
            query: getMom, // Assuming you have a query to fetch a Course by its id
            variables: {
              id: registration.momId,
            },
          });
          return momQuery.data.getMom;
        }
      );
      const moms = await Promise.all(momPromises);
      return moms.map((mom) => {
        return mom as Mom;
      });
    } catch (err) {
      console.log("error fetching moms for course:", err);
      return [];
    }
  }

  const onDayPress = (day: DateData) => {
    if (day.dateString === selectedDate) {
      setSelectedDate("");
      setSessionsOnDate([]);
      return;
    }
    const newSelectedDate = day.dateString;
    setSelectedDate(newSelectedDate);
    const sessionDates = sessions.map((session) =>
      formatToEuropeanDate(session.dateTime)
    );
    if (sessionDates.includes(formatToEuropeanDate(newSelectedDate))) {
      const selectedSessions = sessions.filter(
        (session) => formatToEuropeanDate(session.dateTime) === newSelectedDate
      );
      const customSessions: CustomSession[] = selectedSessions.map(
        (session) => {
          return {
            ...session,
            courseInfo: courses.find(
              (course) => course.id === session.courseID
            )!,
          };
        }
      );
      setSessionsOnDate(customSessions);
    } else {
      setSessionsOnDate([]);
    }
  };

  return (
    <View style={styles.container}>
      <CalendarList
        style={{
          height: 350,
          paddingBottom: 0,
        }}
        onDayPress={onDayPress}
        horizontal={true}
        pagingEnabled={true}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: false,
            selectedColor: "#720039",
          },
        }}
        theme={{
          arrowColor: "#720039",
          todayTextColor: "#72003999",
          calendarBackground: "#f0f0f0",
        }}
        firstDay={1}
        pastScrollRange={24}
        futureScrollRange={12}
      />
      <ScrollView>
        {sessionsOnDate.map((session, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SessionDetails", { session, courses })
            }
            key={index}
          >
            <SessionCard session={session} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedDate !== "" && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("SessionAdd", {
              courses: courses,
              date: selectedDate,
            })
          }
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  addButton: {
    position: "absolute",
    bottom: 20, // Adjust the position from the bottom
    right: 30, // Adjust the position from the right
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#720039",
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Add some elevation to the button for shadow
  },
});
