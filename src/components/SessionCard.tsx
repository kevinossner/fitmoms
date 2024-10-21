import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomSession } from "../types/SessionType";

const SessionCard = ({ session }: { session: CustomSession }) => {
  function datetimeToTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {session.courseInfo.icon &&
          session.courseInfo.icon in MaterialIcons.glyphMap && (
            <MaterialIcons
              name={
                session.courseInfo.icon as keyof typeof MaterialIcons.glyphMap
              }
              size={22}
              color="#666666"
              style={styles.icon}
            />
          )}
        {!session.courseInfo.icon && (
          <MaterialIcons
            name="question-mark"
            size={22}
            color="#666666"
            style={styles.icon}
          />
        )}
        <Text style={styles.cardTitle}>{session.courseInfo.name}</Text>
      </View>
      <View>
        <Text style={styles.info}>
          Uhrzeit: {datetimeToTime(session.dateTime)}
        </Text>
        <Text style={styles.info}>
          Mamas: {session.courseInfo.registratedMoms.length}
        </Text>
      </View>
    </View>
  );
};

export default SessionCard;

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
