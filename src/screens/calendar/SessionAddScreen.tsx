import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { generateClient } from "aws-amplify/api";
import { createSession } from "../../graphql/mutations";
import SessionEditCreateCard from "../../components/SessionEditCreateCard";
import { Course } from "../../types/CourseType";

type SessionAddScreenRouteProp = RouteProp<RootStackParamList, "SessionAdd">;
const client = generateClient();

const SessionAddScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SessionAddScreenRouteProp>();
  const { courses: initialCourses } = route.params;
  const { date: selectedDate } = route.params;
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<Date>();

  function handleFormChange(formState: { courseId: string; dateTime: Date }) {
    setSelectedCourse((prevCourse) => {
      if (prevCourse === formState.courseId) {
        return prevCourse;
      }
      return formState.courseId;
    });
    setSelectedDateTime((prevSelectedDateTime) => {
      if (prevSelectedDateTime === formState.dateTime) {
        return prevSelectedDateTime;
      }
      return formState.dateTime;
    });
  }

  async function addSession() {
    try {
      if (selectedCourse === "") return;
      await client.graphql({
        query: createSession,
        variables: {
          input: {
            courseID: selectedCourse,
            dateTime: selectedDateTime!.toISOString(),
          },
        },
      });
      navigation.goBack();
    } catch (err) {
      console.log("error creating session:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#720039" />
      </TouchableOpacity>
      <View style={styles.content}>
        <SessionEditCreateCard
          onChange={handleFormChange}
          courses={courses}
          date={selectedDate}
        />
      </View>
      <TouchableOpacity onPress={addSession} style={styles.actionButton}>
        <Ionicons name="save" size={24} color="#720039" />
      </TouchableOpacity>
    </View>
  );
};

export default SessionAddScreen;

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
    right: 20, // Adjust the position from the right
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
  },
  content: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 15,
    flex: 1,
  },
  input: {
    marginBottom: 10,
    fontSize: 22,
  },
});
