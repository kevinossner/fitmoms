import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { generateClient } from "aws-amplify/api";
import { createCourse, createRegistration } from "../../graphql/mutations";
import CourseEditCreateCard from "../../components/CourseEditCreateCard";
import { CourseFull } from "../../types/CourseType";
import { Mom } from "../../API";

type MomDetailsScreenRouteProp = RouteProp<RootStackParamList, "CourseAdd">;
const client = generateClient();
const initialCourse: CourseFull = {
  name: "",
  registratedMoms: [],
};

const CourseAddScreen = () => {
  const navigation = useNavigation();
  const [course, setCourse] = useState<CourseFull>(initialCourse);
  const route = useRoute<MomDetailsScreenRouteProp>();
  const { moms: initialMoms } = route.params;
  const [moms, setMoms] = useState<Mom[]>(initialMoms);

  function handleFormChange(updatedCourse: CourseFull) {
    setCourse((prevCourse) => {
      if (
        prevCourse.name === updatedCourse.name &&
        prevCourse.registratedMoms === updatedCourse.registratedMoms
      ) {
        return prevCourse;
      }
      return {
        ...prevCourse,
        name: updatedCourse.name,
        registratedMoms: updatedCourse.registratedMoms,
      };
    });
  }

  async function addCourse() {
    try {
      if (course.name === "") return;

      const response = await client.graphql({
        query: createCourse,
        variables: {
          input: {
            name: course.name,
          },
        },
      });

      const newMomId = response.data.createCourse.id;

      await Promise.all(
        course.registratedMoms.map(async (mom) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: newMomId,
                momId: mom.id,
              },
            },
          });
        })
      );

      navigation.goBack();
    } catch (err) {
      console.log("error creating course:", err);
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
        <CourseEditCreateCard onChange={handleFormChange} moms={moms} />
      </View>
      <TouchableOpacity onPress={addCourse} style={styles.actionButton}>
        <Ionicons name="save" size={24} color="#720039" />
      </TouchableOpacity>
    </View>
  );
};

export default CourseAddScreen;

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
