import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Button as Btn,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { generateClient } from "aws-amplify/api";
import {
  deleteSession,
  deleteAttendance,
  updateSession,
  createAttendance,
} from "../../graphql/mutations";
import { attendancesBySessionIDAndMomID } from "../../graphql/queries";
import { Course } from "../../types/CourseType";
import { Mom, Session } from "../../API";
import DetailsCard from "../../components/DetailsCard";
import { CustomSession } from "../../types/SessionType";
import SessionEditCreateCard from "../../components/SessionEditCreateCard";

type SessionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "SessionDetails"
>;
const client = generateClient();

const SessionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SessionDetailsScreenRouteProp>();
  const { session: initialSession } = route.params;
  const { courses: initialCourses } = route.params;
  const [session, setSession] = useState<CustomSession>(initialSession);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [attendances, setAttendances] = useState<string[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      fetchAttendance();
    }, [])
  );

  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function onEdit() {
    setEditable(true);
    closeMenu();
  }

  async function fetchAttendance() {
    try {
      const attendancesQuery = await client.graphql({
        query: attendancesBySessionIDAndMomID,
        variables: {
          sessionID: session.id,
        },
      });
      const curAttendances =
        attendancesQuery.data.attendancesBySessionIDAndMomID.items.map(
          (attendance) => attendance.momID
        );
      setAttendances(curAttendances);
    } catch (err) {
      console.log("error fetching attendance:", err);
    }
  }

  async function onAttendanceChange(newAttendances: string[]) {
    const attendanceToDelete = attendances.filter(
      (item) => !newAttendances.includes(item)
    );
    const attendanceToCreate = newAttendances.filter(
      (item) => !attendances.includes(item)
    );

    setAttendances(newAttendances);
    try {
      await Promise.all(
        attendanceToCreate.map(async (momId) => {
          await client.graphql({
            query: createAttendance,
            variables: {
              input: {
                momID: momId,
                sessionID: session.id,
              },
            },
          });
        })
      );
      if (attendanceToDelete.length > 0) {
        const attendancesQuery = await client.graphql({
          query: attendancesBySessionIDAndMomID,
          variables: {
            sessionID: session.id,
          },
        });

        const attendanceIdsToDelete =
          attendancesQuery.data.attendancesBySessionIDAndMomID.items
            .filter((item) => attendanceToDelete.includes(item.momID))
            .map((item) => item.id);
        await Promise.all(
          attendanceIdsToDelete.map(async (id) => {
            await client.graphql({
              query: deleteAttendance,
              variables: {
                input: {
                  id: id,
                },
              },
            });
          })
        );
      }
    } catch (err) {
      console.log("error updating attendance:", err);
    }
  }

  function onSessionEdit(formState: { courseId: string; dateTime: Date }) {
    setSession((prevSession) => {
      if (
        prevSession.courseID === formState.courseId &&
        prevSession.dateTime === formState.dateTime.toISOString()
      ) {
        return prevSession;
      }

      return {
        ...prevSession,
        courseID: formState.courseId,
        dateTime: formState.dateTime.toISOString(),
      };
    });
  }

  async function saveSession() {
    try {
      const response = await client.graphql({
        query: updateSession,
        variables: {
          input: {
            id: session.id!,
            dateTime: session.dateTime,
            courseID: session.courseID,
          },
        },
      });
      const update = response.data.updateSession as Session;
      const customSession: CustomSession = {
        ...update,
        courseInfo: courses.find((course) => course.id === session.courseID)!,
      };
      setSession(customSession);
      setEditable(false);
    } catch (err) {
      console.log("error update session:", err);
    }
  }

  async function destroySession() {
    try {
      const attendancesQuery = await client.graphql({
        query: attendancesBySessionIDAndMomID,
        variables: {
          sessionID: session.id,
        },
      });

      const attendanceIdsToDelete =
        attendancesQuery.data.attendancesBySessionIDAndMomID.items.map(
          (item) => item.id
        );
      await Promise.all(
        attendanceIdsToDelete.map(async (id) => {
          await client.graphql({
            query: deleteAttendance,
            variables: {
              input: {
                id: id,
              },
            },
          });
        })
      );

      await client.graphql({
        query: deleteSession,
        variables: {
          input: {
            id: session.id,
          },
        },
      });
      closeMenu();
      navigation.goBack();
    } catch (err) {
      console.log("error delete session:", err);
    }
  }

  if (!editable) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.actionButton}>
            <Menu
              theme={{
                colors: { elevation: { level2: "#ffffff" } },
              }}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={28}
                    color="#720039"
                  />
                </Button>
              }
            >
              <Menu.Item
                title="Bearbeiten"
                leadingIcon="pencil-outline"
                onPress={onEdit}
              />
              <Menu.Item
                title="Löschen"
                leadingIcon="trash-can-outline"
                onPress={destroySession}
              />
            </Menu>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#720039" />
          </TouchableOpacity>
          <View style={styles.content}>
            <DetailsCard
              data={{ session: session, attendances: attendances }}
              onChange={onAttendanceChange}
            />
          </View>
        </View>
      </PaperProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SessionEditCreateCard
            courses={courses}
            selectedSession={session}
            onChange={onSessionEdit}
          />
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={saveSession}>
          <Ionicons name="save" size={24} color="#720039" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setEditable(false)}
        >
          <Ionicons name="arrow-back" size={28} color="#720039" />
        </TouchableOpacity>
      </View>
    );
  }
};

export default SessionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 15,
  },
  backButton: {
    position: "absolute",
    top: 0, // Adjust the position from the bottom
    left: 10, // Adjust the position from the right
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
  },
  actionButton: {
    position: "absolute",
    top: 0, // Adjust the position from the bottom
    right: 10, // Adjust the position from the right
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    flex: 1,
  },
});
