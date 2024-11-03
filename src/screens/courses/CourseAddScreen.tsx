import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Mom as MomDto } from "../../API";
import { NewCourse } from "../../types/CourseType";
import { generateClient } from "aws-amplify/api";
import { listMoms } from "../../graphql/queries";
import { createCourse, createRegistration } from "../../graphql/mutations";
import CourseEditCard from "../../components/CourseEditCard";

const client = generateClient();

const CourseAddScreen = () => {
  const navigation = useNavigation();
  const [course, setCourse] = useState<NewCourse>({
    name: "",
    registratedMoms: [],
  });
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

  function handleFormChange(updatedCourse: NewCourse) {
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
      if (course.name === "") {
        Alert.alert("Error", "Name ausfüllen.");
        return;
      }

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
        <CourseEditCard
          course={course}
          moms={moms}
          onChange={handleFormChange}
        />
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
