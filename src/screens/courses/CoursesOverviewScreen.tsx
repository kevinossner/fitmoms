import React, { useCallback, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { CourseFull } from "../../types/CourseType";
import { Course, Mom } from "../../API";
import CourseCard from "../../components/CourseCard";
import { generateClient } from "aws-amplify/api";
import {
  listCourses,
  registrationsByCourseId,
  getMom,
  listMoms,
} from "../../graphql/queries";

const client = generateClient();

const CoursesOverviewScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [courses, setCourses] = useState<CourseFull[]>([]);
  const [moms, setMoms] = useState<Mom[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchCourses();
      fetchMoms();
    }, [])
  );

  async function fetchCourses() {
    try {
      const coursesQuery = await client.graphql({
        query: listCourses,
      });
      const courses = coursesQuery.data.listCourses.items as Course[];
      courses.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      const coursesFull = await Promise.all(
        courses.map(async (course) => {
          if (course.id) {
            const registratedMoms = await fetchRegistratedMoms(course.id);
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
        return []; // No registrations found
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

      // Step 4: Resolve all promises to get full course details
      const moms = await Promise.all(momPromises);
      return moms.map((mom) => {
        return mom as Mom;
      });
    } catch (err) {
      console.log("error fetching moms for course:", err);
      return []; // Return an empty array in case of error
    }
  }

  async function fetchMoms() {
    try {
      const momsQuery = await client.graphql({
        query: listMoms,
      });
      const moms = momsQuery.data.listMoms.items as Mom[];
      moms.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0; // Names are equal
      });
      setMoms(moms);
    } catch (err) {
      console.log("error fetching moms:", err);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {courses.map((course, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CourseDetails", { course, moms })
            }
            key={index}
          >
            <CourseCard course={course} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CourseAdd", { moms })}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default CoursesOverviewScreen;

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
