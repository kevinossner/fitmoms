import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MomCard from "../../components/MomCard";
import { CustomMom } from "../../types/MomType";
import { Mom, Course } from "../../API";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { generateClient } from "aws-amplify/api";
import {
  listMoms,
  registrationsByMomId,
  listCourses,
  getCourse,
  attendancesByMomIDAndSessionID,
} from "../../graphql/queries";

const client = generateClient();

const MomsOverviewScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [moms, setMoms] = useState<CustomMom[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchMoms();
      fetchCourses();
    }, [])
  );

  async function fetchMoms() {
    try {
      const momsData = await client.graphql({
        query: listMoms,
      });
      const moms = momsData.data.listMoms.items as Mom[];
      moms.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;

        return 0; // Names are equal
      });
      const momsFull = await Promise.all(
        moms.map(async (mom) => {
          if (mom.id) {
            const registratedCourses = await fetchRegistratedCourses(mom.id);
            const attendancesQuery = await client.graphql({
              query: attendancesByMomIDAndSessionID,
              variables: {
                momID: mom.id,
              },
            });
            const attendancesCount =
              attendancesQuery.data.attendancesByMomIDAndSessionID.items.length;
            return {
              id: mom.id,
              firstName: mom.firstName,
              lastName: mom.lastName,
              createdAt: mom.createdAt,
              updatedAt: mom.updatedAt,
              openBills: mom.openBills,
              notes: mom.notes,
              registratedCourses: registratedCourses,
              attendanceCount: attendancesCount,
            } as CustomMom;
          }
          return {
            id: mom.id,
            firstName: mom.firstName,
            lastName: mom.lastName,
            createdAt: mom.createdAt,
            updatedAt: mom.updatedAt,
            openBills: mom.openBills,
            notes: mom.notes,
            registratedCourses: [],
            attendanceCount: 0,
          } as CustomMom;
        })
      );
      setMoms(momsFull);
    } catch (err) {
      console.log("error fetching moms:", err);
    }
  }

  async function fetchRegistratedCourses(momId: string): Promise<Course[]> {
    try {
      // Step 1: Fetch all registrations by momId
      const registrationsData = await client.graphql({
        query: registrationsByMomId,
        variables: {
          momId: momId,
        },
      });

      // Step 2: Extract the list of course IDs from registrations
      const registrations = registrationsData.data.registrationsByMomId.items;

      if (!registrations || registrations.length === 0) {
        return []; // No registrations found
      }

      // Step 3: Fetch full course information for each courseId in the registrations
      const coursePromises = registrations.map(
        async (registration: { courseId: string }) => {
          const courseData = await client.graphql({
            query: getCourse, // Assuming you have a query to fetch a Course by its id
            variables: {
              id: registration.courseId,
            },
          });
          return courseData.data.getCourse;
        }
      );

      // Step 4: Resolve all promises to get full course details
      const courses = await Promise.all(coursePromises);
      return courses.map((course) => {
        return course as Course;
      });
    } catch (err) {
      console.log("error fetching courses for mom:", err);
      return [];
    }
  }

  async function fetchCourses() {
    try {
      const coursesData = await client.graphql({
        query: listCourses,
      });
      const courses = coursesData.data.listCourses.items as Course[];
      courses.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0; // Names are equal
      });
      setCourses(courses);
    } catch (err) {
      console.log("error fetching courses:", err);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moms}
        renderItem={({ item: mom }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MomDetails", { mom, courses })}
          >
            <MomCard mom={mom} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MomAdd", { courses })}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default MomsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
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
