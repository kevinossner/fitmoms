import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { CourseFull } from "../types/CourseType";
import { CustomSession } from "../types/SessionType";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";

const SessionEditCreateCard = ({
  courses,
  selectedSession,
  date,
  onChange,
}: {
  courses: CourseFull[];
  selectedSession?: CustomSession;
  date?: string;
  onChange: (formState: { courseId: string; dateTime: Date }) => void;
}) => {
  const [formState, setFormState] = useState(
    selectedSession
      ? {
          courseId: selectedSession.courseID,
          dateTime: new Date(selectedSession.dateTime),
        }
      : { courseId: "", dateTime: date ? new Date(date) : new Date() }
  );

  useEffect(() => {
    onChange(formState);
  }, [formState, onChange]);

  function formatToEuropeanDate(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function setInput(key: string, value: string | Date) {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  }

  const handleCourseSelect = (selectedCourseId: string) => {
    setInput("courseId", selectedCourseId);
  };

  return (
    <View style={styles.card}>
      <Text>
        {date
          ? formatToEuropeanDate(date)
          : formatToEuropeanDate(selectedSession?.dateTime!)}
      </Text>
      <DateTimePicker
        value={formState.dateTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedTime) => {
          if (selectedTime) {
            const currentDate = formState.dateTime;
            const updatedDateTime = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              selectedTime.getHours(),
              selectedTime.getMinutes()
            );

            setInput("dateTime", updatedDateTime);
          }
        }}
      />
      {!selectedSession && (
        <MultiSelect
          items={courses}
          uniqueKey="id"
          single={true}
          onSelectedItemsChange={(selectedItems) => {
            const selectedCourseId =
              selectedItems.length > 0 ? selectedItems[0] : "";
            handleCourseSelect(selectedCourseId);
          }}
          selectedItems={formState.courseId ? [formState.courseId] : []}
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
      )}
    </View>
  );
};

export default SessionEditCreateCard;

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
