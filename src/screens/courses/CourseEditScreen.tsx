import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { useNavigation } from "@react-navigation/native";
import { NewCourse, Course } from "../../types/CourseType";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseEditCard from "../../components/CourseEditCard";
import { Mom as MomDto } from "../../API";
import { generateClient } from "aws-amplify/api";
import { listMoms } from "../../graphql/queries";

type MomEditScreenRouteProp = RouteProp<RootStackParamList, "CourseEdit">;
const client = generateClient();

const CourseEditScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<MomEditScreenRouteProp>();
  const { course: initialCourse } = route.params;
  const inistialMoms = initialCourse.moms?.items.map(
    (registrations) => registrations?.mom
  );
  const [course, setCourse] = useState<Course>({
    id: initialCourse.id,
    name: initialCourse.name,
    icon: initialCourse.icon,
    registratedMoms: inistialMoms ? inistialMoms : [],
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
    console.log(course);
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
