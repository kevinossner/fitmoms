import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomMom } from "../types/MomType";
import { TextInput } from "react-native-gesture-handler";
import { generateClient } from "aws-amplify/api";
import { updateMom } from "../graphql/mutations";

const MomDetailsCard = ({ mom }: { mom: CustomMom }) => {
  const client = generateClient();
  const [notes, setNotes] = useState<string>(mom.notes ? mom.notes : "");
  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  async function updateNotes(newNotes: string): Promise<void> {
    setNotes(newNotes);
    mom.notes = newNotes;
    await client.graphql({
      query: updateMom,
      variables: {
        input: {
          id: mom.id!,
          notes: newNotes,
        },
      },
    });
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
      <View style={styles.courseRow}>
        {mom.registratedCourses.map((course, index) => {
          if (course.icon && course.icon in MaterialIcons.glyphMap) {
            return (
              <MaterialIcons
                key={index}
                name={course.icon as keyof typeof MaterialIcons.glyphMap}
                size={32}
                color="#666666"
              />
            );
          }
          return (
            <MaterialIcons
              key={index}
              name="question-mark"
              size={32}
              color="#666666"
            />
          );
        })}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Mitglied seit</Text>
        <Text style={styles.value}>{formatToEuropeanDate(mom.createdAt!)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Teilnahmen</Text>
        <Text style={styles.value}>{mom.attendanceCount}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Notiz</Text>
        <View style={styles.notesFormContainer}>
          <TextInput
            style={styles.notesForm}
            selectionColor="#720039"
            multiline={true}
            onChangeText={(value) => updateNotes(value)}
            value={notes}
          />
        </View>
      </View>
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
    color: "#333333",
  },
  courseRow: {
    flexDirection: "row", // Align items in a row
    marginBottom: 12,
  },
  icon: {
    marginLeft: 10, // Optional: Add space between the name and ico
  },
  infoRow: {
    marginBottom: 18,
  },
  label: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    color: "#333333",
    fontSize: 18,
  },
  notesFormContainer: {
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 5,
  },
  notesForm: {
    padding: 6,
    color: "#333333",
    height: 100,
  },
});
