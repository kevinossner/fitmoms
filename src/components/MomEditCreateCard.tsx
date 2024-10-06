import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch, TextInput } from "react-native";
import { CustomMom } from "../types/MomType";
import { Course } from "../API";
import MultiSelect from "react-native-multiple-select";

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
      <TextInput
        style={styles.input}
        onChangeText={(value) => setInput("firstName", value)}
        value={formState.firstName}
        placeholder="Vorname"
        selectionColor={"#720039"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setInput("lastName", value)}
        value={formState.lastName}
        placeholder="Nachname"
        selectionColor={"#720039"}
      />
      <Text>Offene Rechnungen:</Text>
      <Switch
        ios_backgroundColor="#3e3e3e"
        trackColor={{ false: "green", true: "#720039" }}
        onValueChange={(value) => setInput("openBills", value)}
        value={formState.openBills}
      />
      <MultiSelect
        items={courses}
        uniqueKey="id"
        onSelectedItemsChange={handleCourseSelect}
        selectedItems={formState.registratedCourses.map((course) => course.id)}
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
      <TextInput
        style={styles.input}
        value={formState.attendanceCount.toString()}
        placeholder="Anwesenheitsanzahl"
        keyboardType="numeric"
        onChangeText={(value) => {
          // Convert the value to a number
          const numericValue = parseInt(value, 10);
          if (!isNaN(numericValue)) {
            setInput("attendanceCount", numericValue);
          } else {
            setInput("attendanceCount", 0); // Or handle it in some other appropriate way
          }
        }}
      />
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
  input: {
    marginBottom: 10,
    fontSize: 22,
  },
});
