import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { generateClient } from "aws-amplify/api";
import {
  createMom,
  createRegistration,
  createAttendance,
} from "../../graphql/mutations";
import MomEditCreateCard from "../../components/MomEditCreateCard";
import { Course } from "../../API";
import { CustomMom } from "../../types/MomType";

type MomDetailsScreenRouteProp = RouteProp<RootStackParamList, "MomAdd">;
const client = generateClient();

const initialMom: CustomMom = {
  firstName: "",
  lastName: "",
  openBills: false,
  registratedCourses: [],
  attendanceCount: 0,
};

const MomAddScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MomDetailsScreenRouteProp>();
  const { courses: initialCourses } = route.params;
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [mom, setMom] = useState<CustomMom>(initialMom);

  function handleFormChange(updatedMom: CustomMom) {
    setMom((prevMom) => {
      if (
        prevMom.firstName === updatedMom.firstName &&
        prevMom.lastName === updatedMom.lastName &&
        prevMom.openBills === updatedMom.openBills &&
        prevMom.registratedCourses === updatedMom.registratedCourses &&
        prevMom.attendanceCount === updatedMom.attendanceCount
      ) {
        return prevMom;
      }

      return {
        ...prevMom,
        firstName: updatedMom.firstName,
        lastName: updatedMom.lastName,
        openBills: updatedMom.openBills,
        registratedCourses: updatedMom.registratedCourses,
        attendanceCount: updatedMom.attendanceCount,
      };
    });
  }

  async function addMom() {
    try {
      if (mom.firstName === "" || mom.lastName === "") return;

      const response = await client.graphql({
        query: createMom,
        variables: {
          input: {
            firstName: mom.firstName,
            lastName: mom.lastName,
            openBills: mom.openBills,
          },
        },
      });

      const newMomId = response.data.createMom.id;

      await Promise.all(
        mom.registratedCourses.map(async (course) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: course.id!,
                momId: newMomId,
              },
            },
          });
        })
      );

      if (mom.attendanceCount > 0) {
        for (let i = 0; i < mom.attendanceCount; i++) {
          await client.graphql({
            query: createAttendance,
            variables: {
              input: {
                momID: newMomId,
                sessionID: "dummySession",
              },
            },
          });
        }
      }

      navigation.goBack();
    } catch (err) {
      console.log("error creating mom:", err);
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
        <MomEditCreateCard onChange={handleFormChange} courses={courses} />
      </View>
      <TouchableOpacity onPress={addMom} style={styles.actionButton}>
        <Ionicons name="save" size={24} color="#720039" />
      </TouchableOpacity>
    </View>
  );
};

export default MomAddScreen;

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
