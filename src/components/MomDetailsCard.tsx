import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Mom as MomDto } from "../API";
import { TextInput } from "react-native-gesture-handler";
import { generateClient } from "aws-amplify/api";

const MomDetailsCard = ({
  mom,
  onNotesChange,
}: {
  mom: MomDto;
  onNotesChange: (newNotes: string) => void;
}) => {
  const client = generateClient();
  const [notes, setNotes] = useState<string>(mom.notes ? mom.notes : "");
  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    onNotesChange(newNotes);
  };

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
        {mom.courses?.items.map((registration, index) => {
          if (
            registration &&
            registration.course &&
            registration.course.icon &&
            registration.course.icon in MaterialIcons.glyphMap
          ) {
            return (
              <MaterialIcons
                key={index}
                name={
                  registration.course
                    .icon as keyof typeof MaterialIcons.glyphMap
                }
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
        <Text style={styles.value}>{mom.attendances?.items.length}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Notiz</Text>
        <View style={styles.notesFormContainer}>
          <TextInput
            style={styles.notesForm}
            selectionColor="#720039"
            multiline={true}
            onChangeText={handleNotesChange}
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
