import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Course as CourseDto } from "../../API";
import { Course } from "../../types/CourseType";
import { NewMom } from "../../types/MomType";
import { generateClient } from "aws-amplify/api";
import { listCourses } from "../../graphql/queries";
import {
  createMom,
  createRegistration,
  createAttendance,
} from "../../graphql/mutations";
import MomEditCard from "../../components/MomEditCard";

const client = generateClient();

const MomAddScreen = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [mom, setMom] = useState<NewMom>({
    firstName: "",
    lastName: "",
    openBills: false,
    notes: "",
    registratedCourses: [],
    attendanceCount: 0,
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  function handleFormChange(updatedMom: NewMom) {
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

  const fetchData = async () => {
    try {
      const coursesQuery = await client.graphql({
        query: listCourses,
      });
      const fetchedCourses = coursesQuery.data.listCourses.items as CourseDto[];
      fetchedCourses.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setCourses(fetchedCourses);
    } catch (error) {
      Alert.alert("Error", "Daten konnten nicht geladen werden.");
    }
  };

  async function addMom() {
    try {
      if (mom.firstName === "" || mom.lastName === "") {
        Alert.alert("Error", "Vor- und Nachnamen ausfüllen.");
        return;
      }
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
    } catch (error) {
      Alert.alert("Error", `${error}`);
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
        <MomEditCard
          courses={courses as CourseDto[]}
          mom={mom}
          onChange={handleFormChange}
        />
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
    top: 0,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    position: "absolute",
    top: 0,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
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
