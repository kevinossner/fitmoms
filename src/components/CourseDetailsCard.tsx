import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Course as CourseDto } from "../API";

const CourseDetailsCard = ({ course }: { course: CourseDto }) => {
  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {course.icon && course.icon in MaterialIcons.glyphMap && (
          <MaterialIcons
            name={course.icon as keyof typeof MaterialIcons.glyphMap}
            size={80}
            color="#666666"
            style={styles.icon}
          />
        )}
        <Text style={styles.cardHeaderText}>{course.name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text>Mamas:</Text>
        <FlatList
          data={course.moms?.items}
          renderItem={({ item: mom }) => (
            <Text>
              - {mom?.mom.firstName} {mom?.mom.lastName}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default CourseDetailsCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15, // Rounded corners
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#333333",
  },
  icon: {
    marginLeft: 10, // Optional: Add space between the name and ico
  },
  cardContent: {
    marginLeft: 12,
    marginRight: 12,
  },
  // card: {
  //   backgroundColor: "#ffffff",
  //   borderRadius: 15, // Rounded corners
  //   padding: 20,
  //   shadowColor: "#000000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3, // Shadow for Android
  // },
  // cardTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
  // row: {
  //   flexDirection: "row", // Align items in a row
  // },
  // icon: {
  //   marginLeft: 10, // Optional: Add space between the name and ico
  // },
});
