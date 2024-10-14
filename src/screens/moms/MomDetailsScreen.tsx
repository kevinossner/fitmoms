import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import MomDetailsCard from "../../components/MomDetailsCard";
import MomEditCreateCard from "../../components/MomEditCreateCard";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { generateClient } from "aws-amplify/api";
import {
  attendancesByMomIDAndSessionID,
  registrationsByMomId,
} from "../../graphql/queries";
import {
  deleteMom,
  updateMom,
  deleteRegistration,
  createRegistration,
  createAttendance,
  deleteAttendance,
} from "../../graphql/mutations";
import { CustomMom } from "../../types/MomType";
import { Course } from "../../API";

type MomDetailsScreenRouteProp = RouteProp<RootStackParamList, "MomDetails">;
const client = generateClient();

const MomDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MomDetailsScreenRouteProp>();

  const { mom: initialMom } = route.params;
  const { courses: initialCourses } = route.params;
  const [mom, setMom] = useState<CustomMom>(initialMom);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [visible, setVisible] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [initialAttendance, setInitialAttendance] = React.useState(
    route.params.mom.attendanceCount
  );
  const [attendanceDiff, setAttendanceDiff] = React.useState(0);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function onEdit() {
    setEditable(true);
    closeMenu();
  }

  function onMomEdit(updatedMom: CustomMom) {
    setMom((prevMom) => {
      if (
        prevMom.firstName === updatedMom.firstName &&
        prevMom.lastName === updatedMom.lastName &&
        prevMom.openBills === updatedMom.openBills &&
        prevMom.registratedCourses === updatedMom.registratedCourses &&
        prevMom.attendanceCount === updatedMom.attendanceCount
      ) {
        return prevMom;
      }
      setAttendanceDiff(updatedMom.attendanceCount - initialAttendance);
      return {
        ...prevMom,
        firstName: updatedMom.firstName,
        lastName: updatedMom.lastName,
        openBills: updatedMom.openBills,
        registratedCourses: updatedMom.registratedCourses,
        attendanceCount: updatedMom.attendanceCount,
      };
    });
  }

  async function saveMom() {
    try {
      const { data: registrationData } = await client.graphql({
        query: registrationsByMomId,
        variables: {
          momId: mom.id!,
        },
      });

      const registrationIds = registrationData.registrationsByMomId.items.map(
        (item) => item.id
      );

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
        mom.registratedCourses.map(async (course) => {
          await client.graphql({
            query: createRegistration,
            variables: {
              input: {
                courseId: course.id!,
                momId: mom.id!,
              },
            },
          });
        })
      );

      await client.graphql({
        query: updateMom,
        variables: {
          input: {
            id: mom.id!,
            firstName: mom.firstName,
            lastName: mom.lastName,
            openBills: mom.openBills,
          },
        },
      });
      if (attendanceDiff > 0) {
        for (let i = 0; i < attendanceDiff; i++) {
          await client.graphql({
            query: createAttendance,
            variables: {
              input: {
                momID: mom.id!,
                sessionID: "dummySession",
              },
            },
          });
        }
      }
      console.log(attendanceDiff);
      if (attendanceDiff < 0) {
        const attendanceQuery = await client.graphql({
          query: attendancesByMomIDAndSessionID,
          variables: {
            momID: mom.id!,
          },
        });

        let attendances =
          attendanceQuery.data.attendancesByMomIDAndSessionID.items;

        // Sort attendances to delete "dummySession" first, and then by the oldest attendances
        const dummyAttendances = attendances.filter(
          (att) => att.sessionID === "dummySession"
        );
        const nonDummyAttendances = attendances.filter(
          (att) => att.sessionID !== "dummySession"
        );

        // Combine with dummy attendances first
        attendances = [...dummyAttendances, ...nonDummyAttendances];

        // Calculate how many attendances need to be deleted
        const numToDelete = Math.abs(attendanceDiff);

        // Loop to delete the required number of attendances
        for (let i = 0; i < numToDelete; i++) {
          const attendanceId = attendances[i].id;
          await client.graphql({
            query: deleteAttendance,
            variables: {
              input: {
                id: attendanceId,
              },
            },
          });
        }
      }
      setInitialAttendance(mom.attendanceCount);
      setEditable(false);
    } catch (err) {
      console.log("error update mom:", err);
    }
  }

  async function destroyMom() {
    try {
      const { data: registrationData } = await client.graphql({
        query: registrationsByMomId,
        variables: {
          momId: mom.id!,
        },
      });

      const registrationIds = registrationData.registrationsByMomId.items.map(
        (item) => item.id
      );

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
        query: deleteMom,
        variables: {
          input: {
            id: mom.id!,
          },
        },
      });
      closeMenu();
      navigation.goBack();
    } catch (err) {
      console.log("error delete mom:", err);
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
                onPress={destroyMom}
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
            <MomDetailsCard mom={mom} />
          </View>
        </View>
      </PaperProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setEditable(false)}
        >
          <Ionicons name="arrow-back" size={28} color="#720039" />
        </TouchableOpacity>
        <View style={styles.content}>
          <MomEditCreateCard mom={mom} courses={courses} onChange={onMomEdit} />
        </View>
        <TouchableOpacity onPress={saveMom} style={styles.actionButton}>
          <Ionicons name="save" size={24} color="#720039" />
        </TouchableOpacity>
      </View>
    );
  }
};

export default MomDetailsScreen;

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
