import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { NewCourse } from "../types/CourseType";
import { Mom as MomDto } from "../API";

const CourseEditCard = ({
  moms,
  course,
  onChange,
}: {
  moms: MomDto[];
  course: NewCourse;
  onChange: (formState: NewCourse) => void;
}) => {
  const [formState, setFormState] = useState(course);
  useEffect(() => {
    onChange(formState);
  }, [formState, onChange]);

  function setInput(key: string, value: string | MomDto[]) {
    setFormState((prevState) => {
      const updatedState = { ...prevState, [key]: value };
      onChange(updatedState);
      return updatedState;
    });
  }
  const handleMomSelect = (selectedMomIds: string[]) => {
    const selectedMoms = moms.filter((mom) => selectedMomIds.includes(mom.id));
    setInput("registratedMoms", selectedMoms);
  };

  const preparedMoms = moms.map((mom) => ({
    ...mom,
    fullName: `${mom.firstName} ${mom.lastName}`,
  }));
  return (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Kurs-Name</Text>
        <TextInput
          style={styles.inputForm}
          onChangeText={(value) => setInput("name", value)}
          value={formState.name}
          placeholder="Name"
          selectionColor={"#720039"}
        />
      </View>
      <MultiSelect
        items={preparedMoms}
        uniqueKey="id"
        onSelectedItemsChange={handleMomSelect}
        selectedItems={formState.registratedMoms.map((mom) => mom.id)}
        selectText="Mamas wählen..."
        searchInputPlaceholderText="Mamas suchen..."
        tagRemoveIconColor="#720039"
        tagBorderColor="#72003999"
        tagTextColor="#72003999"
        selectedItemTextColor="#72003999"
        selectedItemIconColor="#72003999"
        itemTextColor="#ccc"
        displayKey="fullName"
        searchInputStyle={{ color: "#ccc" }}
        hideSubmitButton={true}
      />
    </View>
  );
};

export default CourseEditCard;

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
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 4,
  },
  inputForm: {
    color: "#999999",
    fontSize: 16,
  },
});
