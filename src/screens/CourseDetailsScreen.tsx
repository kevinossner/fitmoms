import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseDetailsCard from "../components/CourseDetailsCard";
import CourseEditCreateCard from "../components/CourseEditCreateCard";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { generateClient } from "aws-amplify/api";
import {
  deleteCourse,
  updateCourse,
  deleteRegistration,
  createRegistration,
} from "../graphql/mutations";
import { registrationsByCourseId } from "../graphql/queries";
import { CourseFull } from "../types/CourseType";
import { Mom } from "../API";

type CourseDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "CourseDetails"
>;
const client = generateClient();

const CourseDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<CourseDetailsScreenRouteProp>();

  const { course: initialCourse } = route.params;
  const [course, setCourse] = useState<CourseFull>(initialCourse);
  const { moms: initialMoms } = route.params;
  const [moms, setMoms] = useState<Mom[]>(initialMoms);
  const [visible, setVisible] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function onEdit() {
    setEditable(true);
    closeMenu();
  }

  function onCourseEdit(updatedCourse: CourseFull) {
    setCourse((prevCourse) => {
      if (
        prevCourse.name === updatedCourse.name &&
        prevCourse.registratedMoms === updatedCourse.registratedMoms
      ) {
        return prevCourse;
      }

      return {
        ...prevCourse,
        name: updatedCourse.name,
        registratedMoms: updatedCourse.registratedMoms,
      };
    });
  }

  async function saveCourse() {
    try {
      const { data: registrationData } = await client.graphql({
        query: registrationsByCourseId,
        variables: {
          courseId: course.id!,
        },
      });

      const registrationIds =
        registrationData.registrationsByCourseId.items.map((item) => item.id);

      await Promise.all(
        registrationIds.map((registrationId) =>
          client.graphql({
            query: deleteRegistration,
            variables: {
              input: { id: registrationId },
            },
          })
        )
      );
      await Promise.all(
        course.registratedMoms.map(async (mom) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: course.id!,
                momId: mom.id,
              },
            },
          });
        })
      );

      await client.graphql({
        query: updateCourse,
        variables: {
          input: {
            id: course.id!,
            name: course.name,
          },
        },
      });
      setEditable(false);
    } catch (err) {
      console.log("error update course:", err);
    }
  }

  async function destroyCourse() {
    try {
      const { data: registrationData } = await client.graphql({
        query: registrationsByCourseId,
        variables: {
          courseId: course.id!,
        },
      });

      const registrationIds =
        registrationData.registrationsByCourseId.items.map((item) => item.id);

      await Promise.all(
        registrationIds.map((registrationId) =>
          client.graphql({
            query: deleteRegistration,
            variables: {
              input: { id: registrationId },
            },
          })
        )
      );

      await client.graphql({
        query: deleteCourse,
        variables: {
          input: {
            id: course.id!,
          },
        },
      });
      closeMenu();
      navigation.goBack();
    } catch (err) {
      console.log("error delete course:", err);
    }
  }

  if (!editable) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.actionButton}>
            <Menu
              theme={{
                colors: { elevation: { level2: "#ffffff" } },
              }}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={28}
                    color="#720039"
                  />
                </Button>
              }
            >
              <Menu.Item
                title="Bearbeiten"
                leadingIcon="pencil-outline"
                onPress={onEdit}
              />
              <Menu.Item
                onPress={destroyCourse}
                title="Löschen"
                leadingIcon="trash-can-outline"
              />
            </Menu>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#720039" />
          </TouchableOpacity>
          <View style={styles.content}>
            <CourseDetailsCard course={course} />
          </View>
        </View>
      </PaperProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CourseEditCreateCard
            course={course}
            moms={moms}
            onChange={onCourseEdit}
          />
        </View>
        <TouchableOpacity onPress={saveCourse} style={styles.actionButton}>
          <Ionicons name="save" size={24} color="#720039" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setEditable(false)}
        >
          <Ionicons name="arrow-back" size={28} color="#720039" />
        </TouchableOpacity>
      </View>
    );
  }
};

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 15,
  },
  backButton: {
    position: "absolute",
    top: 0, // Adjust the position from the bottom
    left: 10, // Adjust the position from the right
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
  },
  actionButton: {
    position: "absolute",
    top: 0, // Adjust the position from the bottom
    right: 10, // Adjust the position from the right
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    flex: 1,
  },
});
