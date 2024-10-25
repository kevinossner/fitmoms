import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Course as CourseDto } from "../../API";
import { generateClient } from "aws-amplify/api";
import { listCourses } from "../../graphql/queries";

const client = generateClient();

const MomAddScreen = () => {
  const navigation = useNavigation();
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
        return 0; // Names are equal
      });
      setCourses(fetchedCourses);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch moms data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#720039" />
      </TouchableOpacity>
      <View style={styles.content}>
        {/* <MomEditCreateCard onChange={handleFormChange} courses={courses} /> */}
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("save");
        }}
        style={styles.actionButton}
      >
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
