import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { Mom as MomDto } from "../../API";
import { Course as CourseDto } from "../../API";
import { generateClient } from "aws-amplify/api";
import { Mom, NewMom } from "../../types/MomType";
import { Course } from "../../types/CourseType";
import MomEditCard from "../../components/MomEditCard";
import { listCourses, getMomWithRelations } from "../../graphql/queries";
import {
  updateMom,
  createAttendance,
  deleteAttendance,
  createRegistration,
  deleteRegistration,
} from "../../graphql/mutations";

type MomEditScreenRouteProp = RouteProp<RootStackParamList, "MomEdit">;
const client = generateClient();

const MomEditScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<MomEditScreenRouteProp>();
  const { mom: initialMom } = route.params;
  const initialCourses = initialMom.courses?.items.map((registration) => {
    return registration?.course as Course;
  });
  const [mom, setMom] = useState<Mom>({
    id: initialMom.id,
    firstName: initialMom.firstName,
    lastName: initialMom.lastName,
    openBills: initialMom.openBills,
    notes: initialMom.notes ? initialMom.notes : "",
    registratedCourses: initialCourses || [],
    attendanceCount:
      initialMom.attendances && initialMom.attendances.items
        ? initialMom.attendances.items.length
        : 0,
  } as Mom);
  const [courses, setCourses] = useState<CourseDto[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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

  function handleFormChange(updatedMom: NewMom | Mom) {
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

  async function onSave() {
    try {
      const initialAttendance =
        initialMom.attendances && initialMom.attendances.items
          ? initialMom.attendances.items.length
          : 0;
      const attendanceDiff = mom.attendanceCount - initialAttendance;
      let registrationsToDelete: { id: string; courseId: string }[] = [];
      let coursesToAdd = mom.registratedCourses;
      if (initialMom.courses) {
        const initialRegistrations = initialMom.courses.items.map(
          (registration) => {
            return { id: registration!.id, courseId: registration!.course.id };
          }
        );
        const curCourses = mom.registratedCourses;
        registrationsToDelete = initialRegistrations.filter(
          (item1) => !curCourses.some((item2) => item2.id === item1.id)
        );
        coursesToAdd = curCourses.filter(
          (item2) =>
            !registrationsToDelete.some((item1) => item1.id === item2.id)
        );
      }
      await Promise.all(
        registrationsToDelete.map((registration) => {
          if (registration.id) {
            client.graphql({
              query: deleteRegistration,
              variables: {
                input: { id: registration.id },
              },
            });
          }
        })
      );
      await Promise.all(
        coursesToAdd.map(async (course) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: course.id!,
                momId: mom.id!,
              },
            },
          });
        })
      );
      if (attendanceDiff > 0) {
        for (let i = 0; i < attendanceDiff; i++) {
          await client.graphql({
            query: createAttendance,
            variables: {
              input: {
                momID: mom.id!,
                sessionID: "dummySession",
              },
            },
          });
        }
      }
      if (attendanceDiff < 0) {
        let attendances =
          initialMom.attendances?.items.map((attendance) => {
            return attendance?.id;
          }) || [];
        const dummyAttendances = attendances.filter(
          (att) => att === "dummySession"
        );
        const nonDummyAttendances = attendances.filter(
          (att) => att !== "dummySession"
        );
        attendances = [...dummyAttendances, ...nonDummyAttendances];
        const numToDelete = Math.abs(attendanceDiff);
        for (let i = 0; i < numToDelete; i++) {
          const attendanceId = attendances[i];
          if (!attendanceId) {
            return;
          }
          await client.graphql({
            query: deleteAttendance,
            variables: {
              input: {
                id: attendanceId,
              },
            },
          });
        }
      }

      await client.graphql({
        query: updateMom,
        variables: {
          input: {
            id: mom.id!,
            firstName: mom.firstName,
            lastName: mom.lastName,
            openBills: mom.openBills,
          },
        },
      });
      const response = await client.graphql({
        query: getMomWithRelations,
        variables: { id: mom.id },
      });
      if ("data" in response) {
        const updatedMom = response.data.getMom as MomDto;
        navigation.navigate("MomDetails", { mom: updatedMom });
      }
    } catch (error) {
      Alert.alert("Error", "Daten konnten nicht gespeichert werden.");
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
          courses={courses as Course[]}
          mom={mom}
          onChange={handleFormChange}
        />
      </View>
      <TouchableOpacity onPress={onSave} style={styles.actionButton}>
        <Ionicons name="save" size={24} color="#720039" />
      </TouchableOpacity>
    </View>
  );
};

export default MomEditScreen;

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
