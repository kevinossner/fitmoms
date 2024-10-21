import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomSession } from "../types/SessionType";
import { Mom } from "../API";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

const DetailsCard = ({
  data,
  onChange,
}: // onChange,
{
  data: { session: CustomSession; attendances: string[] };
  onChange: (attendance: string[]) => void;
}) => {
  const [icon, setIcon] = useState<string>("");
  const [attendanceChecks, setAttendanceChecks] = useState<boolean[]>([]);

  function datetimeToDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  useFocusEffect(
    useCallback(() => {
      fetchIcon();
      setAttendance();
    }, [data])
  );

  function fetchIcon() {
    if (
      data.session.__typename === "Session" &&
      data.session.courseInfo.icon &&
      data.session.courseInfo.icon in MaterialIcons.glyphMap
    ) {
      setIcon(data.session.courseInfo.icon);
    } else {
      setIcon("question-mark");
    }
  }

  function setAttendance() {
    const newAttendance =
      data.attendances.length > 0
        ? data.session.courseInfo.registratedMoms
            .map((mom) => mom.id)
            .map((id) => data.attendances.includes(id))
        : new Array(data.session.courseInfo.registratedMoms.length).fill(false);
    setAttendanceChecks(newAttendance);
  }

  function handleCheckboxChange(index: number, value: boolean) {
    const updatedCheckedStates = [...attendanceChecks];
    updatedCheckedStates[index] = value;
    setAttendanceChecks(updatedCheckedStates);
    if (value) {
      const updatedAttendance = [
        ...data.attendances,
        data.session.courseInfo.registratedMoms[index].id,
      ];
      onChange(updatedAttendance);
    } else {
      const updatedAttendance = data.attendances.filter(
        (item) => item !== data.session.courseInfo.registratedMoms[index].id
      );
      onChange(updatedAttendance);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon && icon in MaterialIcons.glyphMap && (
          <MaterialIcons
            name={icon as keyof typeof MaterialIcons.glyphMap}
            size={80}
            color="#666666"
          />
        )}
        {!icon && (
          <MaterialIcons name="question-mark" size={80} color="#666666" />
        )}
        <Text style={styles.cardHeaderText}>
          {data.session.courseInfo.name}
        </Text>
      </View>
      <View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Uhrzeit</Text>
          <Text style={styles.value}>
            {datetimeToDate(data.session.dateTime)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Mamas</Text>
          <FlatList
            data={data.session.courseInfo.registratedMoms}
            keyExtractor={(item) => item.id}
            renderItem={({ item: mom, index }) => (
              <View style={styles.listItem}>
                <Text style={styles.value}>
                  {mom.firstName} {mom.lastName}
                </Text>
                <Checkbox
                  color="#720039"
                  value={attendanceChecks[index]}
                  onValueChange={(newValue) =>
                    handleCheckboxChange(index, newValue)
                  }
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsCard;

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
  cardHeaderIcon: {
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
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    justifyContent: "space-between",
    marginRight: 24,
  },
});
