import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CustomMom } from "../types/MomType";
import { Course } from "../API";
import MultiSelect from "react-native-multiple-select";
import Ionicons from "@expo/vector-icons/Ionicons";

const initialMom: CustomMom = {
  firstName: "",
  lastName: "",
  openBills: false,
  registratedCourses: [],
  attendanceCount: 0,
};

const MomEditCreateCard = ({
  mom,
  courses,
  onChange,
}: {
  mom?: CustomMom;
  courses: Course[];
  onChange: (formState: CustomMom) => void;
}) => {
  const [formState, setFormState] = useState(
    mom
      ? ({
          firstName: mom.firstName,
          lastName: mom.lastName,
          openBills: mom.openBills,
          registratedCourses: mom.registratedCourses,
          attendanceCount: mom.attendanceCount,
        } as CustomMom)
      : initialMom
  );

  const [attendances, setAttendances] = useState(0);

  useEffect(() => {
    onChange(formState);
  }, [formState, onChange]);

  function setInput(key: string, value: string | number | boolean | Course[]) {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  }

  const handleCourseSelect = (selectedCourseIds: string[]) => {
    const selectedCourses = courses.filter((course) =>
      selectedCourseIds.includes(course.id)
    );
    setInput("registratedCourses", selectedCourses);
  };

  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Vorname</Text>
        <TextInput
          style={styles.inputForm}
          onChangeText={(value) => setInput("firstName", value)}
          value={formState.firstName}
          placeholder="Vorname"
          selectionColor={"#720039"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nachname</Text>
        <TextInput
          style={styles.inputForm}
          onChangeText={(value) => setInput("lastName", value)}
          value={formState.lastName}
          placeholder="Nachname"
          selectionColor={"#720039"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Offene Rechnungen</Text>
        <Switch
          ios_backgroundColor="#3e3e3e"
          trackColor={{ false: "green", true: "#720039" }}
          onValueChange={(value) => setInput("openBills", value)}
          value={formState.openBills}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Teilnahmen</Text>
        <View style={styles.attendanceForm}>
          <TouchableOpacity
            onPress={() => {
              const newCounter = formState.attendanceCount - 1;
              if (newCounter >= 0) {
                setInput("attendanceCount", newCounter);
              } else {
                setInput("attendanceCount", 0);
              }
            }}
          >
            <Ionicons name="remove-circle-outline" size={28} color="#720039" />
          </TouchableOpacity>
          <Text style={styles.attendanceValue}>
            {formState.attendanceCount}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setInput("attendanceCount", formState.attendanceCount + 1)
            }
          >
            <Ionicons name="add-circle-outline" size={28} color="#720039" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <MultiSelect
          items={courses}
          uniqueKey="id"
          onSelectedItemsChange={handleCourseSelect}
          selectedItems={formState.registratedCourses.map(
            (course) => course.id
          )}
          selectText="Kurse wählen..."
          searchInputPlaceholderText="Kurse suchen..."
          tagRemoveIconColor="#720039"
          tagBorderColor="#72003999"
          tagTextColor="#72003999"
          selectedItemTextColor="#72003999"
          selectedItemIconColor="#72003999"
          itemTextColor="#ccc"
          displayKey="name"
          searchInputStyle={{ color: "#ccc" }}
          hideSubmitButton={true}
        />
      </View>
    </View>
  );
};

export default MomEditCreateCard;

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
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 6,
  },
  inputForm: {
    color: "#999999",
    fontSize: 16,
  },
  attendanceForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendanceValue: {
    fontSize: 24,
    color: "#333333",
    paddingStart: 10,
    paddingEnd: 10,
  },
});
