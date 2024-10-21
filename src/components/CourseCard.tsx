import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CourseFull } from "../types/CourseType";

const CourseCard = ({ course }: { course: CourseFull }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {course.icon && course.icon in MaterialIcons.glyphMap && (
          <MaterialIcons
            name={course.icon as keyof typeof MaterialIcons.glyphMap}
            size={22}
            color="#666666"
            style={styles.icon}
          />
        )}
        {!course.icon && (
          <MaterialIcons
            name="question-mark"
            size={22}
            color="#666666"
            style={styles.icon}
          />
        )}
        <Text style={styles.cardTitle}>{course.name}</Text>
      </View>
      <Text style={styles.info}>Mamas: {course.registratedMoms.length}</Text>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15, // Rounded corners
    padding: 20,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  row: {
    flexDirection: "row", // Align items in a row
    // alignItems: "center", // Vertically center the items in the row
    // justifyContent: "space-between", // Optional: Add space between name and icon
  },
  icon: {
    marginRight: 5, // Optional: Add space between the name and ico
  },
  info: {
    color: "#333333",
  },
});
