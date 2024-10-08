import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomMom } from "../types/MomType";

const MomDetailsCard = ({ mom }: { mom: CustomMom }) => {
  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={80} color="#d0d0d0" />
        <Text style={styles.cardHeaderText}>
          {mom.firstName} {mom.lastName}
        </Text>
        {mom.openBills && (
          <Ionicons
            name="warning-outline"
            size={20}
            color="#720039"
            style={styles.icon}
          />
        )}
      </View>
      <View style={styles.row}>
        {mom.registratedCourses.map((course, index) => {
          if (course.icon && course.icon in MaterialIcons.glyphMap) {
            return (
              <MaterialIcons
                key={index}
                name={course.icon as keyof typeof MaterialIcons.glyphMap}
                size={22}
                color="#666666"
              />
            );
          }
          return (
            <MaterialIcons
              key={index}
              name="question-mark"
              size={22}
              color="#666666"
            />
          );
        })}
      </View>
      <Text>Mitglied seit: {formatToEuropeanDate(mom.createdAt!)}</Text>
      <Text>Teilnahmen: {mom.attendanceCount}</Text>
    </View>
  );
};

export default MomDetailsCard;

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
  },
  row: {
    flexDirection: "row", // Align items in a row
    // alignItems: "center", // Vertically center the items in the row
    // justifyContent: "space-between", // Optional: Add space between name and icon
  },
  icon: {
    marginLeft: 10, // Optional: Add space between the name and ico
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
