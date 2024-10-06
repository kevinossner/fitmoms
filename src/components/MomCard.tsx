import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomMom } from "../types/MomType";

const MomCard = ({ mom }: { mom: CustomMom }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>
          {mom.firstName} {mom.lastName}
        </Text>
        {mom.openBills && (
          <Ionicons
            name="warning-outline"
            size={20}
            color="#720039"
            style={styles.billsIcon}
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
      <Text>Teilnahmen: {mom.attendanceCount}</Text>
    </View>
  );
};

export default MomCard;

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
  },
  row: {
    flexDirection: "row",
    // alignItems: "center", // Vertically center the items in the row
    // justifyContent: "space-between", // Optional: Add space between name and icon
  },
  billsIcon: {
    marginLeft: 10,
  },
});
