import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { useNavigation } from "@react-navigation/native";
import { NewCourse, Course } from "../../types/CourseType";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseEditCard from "../../components/CourseEditCard";
import { Mom as MomDto, Course as CourseDto } from "../../API";
import { generateClient } from "aws-amplify/api";
import { listMoms, getCourseWithRelations } from "../../graphql/queries";
import {
  updateCourse,
  createRegistration,
  deleteRegistration,
} from "../../graphql/mutations";

type MomEditScreenRouteProp = RouteProp<RootStackParamList, "CourseEdit">;
const client = generateClient();

const CourseEditScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<MomEditScreenRouteProp>();
  const { course: initialCourse } = route.params;
  const initialMoms = initialCourse.moms?.items.map(
    (registrations) => registrations?.mom
  );
  const initialRegistrations = initialCourse.moms
    ? initialCourse.moms.items
    : [];
  const [course, setCourse] = useState<Course>({
    id: initialCourse.id,
    name: initialCourse.name,
    icon: initialCourse.icon,
    registratedMoms: initialMoms ? initialMoms : [],
    createdAt: initialCourse.createdAt,
    updatedAt: initialCourse.updatedAt,
  } as Course);
  const [moms, setMoms] = useState<MomDto[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const coursesQuery = await client.graphql({
        query: listMoms,
      });
      const fetchedMoms = coursesQuery.data.listMoms.items as MomDto[];
      fetchedMoms.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });
      setMoms(fetchedMoms);
    } catch (error) {
      Alert.alert("Error", "Daten konnten nicht geladen werden.");
    }
  };

  function handleFormChange(updatedCourse: NewCourse | Course) {
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

  async function onSave() {
    try {
      const initialIds = new Set(
        initialRegistrations.map((item) => item!.mom.id)
      );
      const updatedIds = new Set(course.registratedMoms.map((item) => item.id));
      // Find items to delete (in initial but not in updated)
      const itemsToDelete = initialRegistrations.filter(
        (item) => !updatedIds.has(item!.mom.id)
      );

      // Find items to add (in updated but not in initial)
      const itemsToAdd = course.registratedMoms.filter(
        (item) => !initialIds.has(item.id)
      );
      console.log(itemsToAdd);
      console.log(itemsToDelete);

      if (itemsToDelete.length > 0) {
        await Promise.all(
          itemsToDelete.map(async (registration) => {
            if (registration!.id) {
              await client.graphql({
                query: deleteRegistration,
                variables: {
                  input: { id: registration!.id },
                },
              });
            }
          })
        );
      }
      await Promise.all(
        itemsToAdd.map(async (mom) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: course.id,
                momId: mom.id,
              },
            },
          });
        })
      );
      await client.graphql({
        query: updateCourse,
        variables: {
          input: {
            id: course.id,
            name: course.name,
          },
        },
      });
      const response = await client.graphql({
        query: getCourseWithRelations,
        variables: { id: course.id },
      });
      if ("data" in response) {
        const updatedCourse = response.data.getCourse as CourseDto;
        navigation.navigate("CourseDetails", { course: updatedCourse });
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
        <CourseEditCard
          course={course}
          moms={moms}
          onChange={handleFormChange}
        />
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons onPress={onSave} name="save" size={24} color="#720039" />
      </TouchableOpacity>
    </View>
  );
};

export default CourseEditScreen;

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
