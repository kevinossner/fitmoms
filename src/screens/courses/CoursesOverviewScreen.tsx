import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { generateClient } from "aws-amplify/api";
import { Course as CourseDto } from "../../API";
import { listCoursesWithRelations } from "../../graphql/queries";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseCard from "../../components/CourseCard";

const client = generateClient();

const CoursesOverviewScreen = () => {
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [courses, setCourses] = useState<CourseDto[]>([]);

  const fetchData = async () => {
    try {
      const result = await client.graphql({
        query: listCoursesWithRelations,
      });
      if ("data" in result) {
        const fetchedCourses = result.data.listCourses.items as CourseDto[];
        fetchedCourses.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;

          return 0;
        });
        setCourses(fetchedCourses);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Daten konnten nicht geladen werden.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{courses.length}</Text>
      <FlatList
        data={courses}
        renderItem={({ item: course }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CourseDetails", { course })}
          >
            <CourseCard course={course} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CourseAdd")}
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
  },
  counter: {
    marginRight: 20,
    color: "#666666",
    textAlign: "right",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#720039",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
