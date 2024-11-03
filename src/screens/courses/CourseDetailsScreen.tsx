import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseDetailsCard from "../../components/CourseDetailsCard";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { generateClient } from "aws-amplify/api";
import { registrationsByMomId } from "../../graphql/queries";
import { deleteCourse, deleteRegistration } from "../../graphql/mutations";
import { Course as CourseDto } from "../../API";

type CourseDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "CourseDetails"
>;
const client = generateClient();

const CourseDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<CourseDetailsScreenRouteProp>();

  const { course: initialCourse } = route.params;
  const [course, setCourse] = useState<CourseDto>(initialCourse);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.course) {
        setCourse(route.params.course);
      }
    }, [route.params?.course])
  );

  function openConfirmation() {
    Alert.alert("Bist du sicher?", "Kurs wird unwiderruflich gelöscht", [
      {
        text: "Abbrechen",
        style: "cancel",
      },
      { text: "Bestätigen", onPress: () => destroyCourse() },
    ]);
  }

  async function destroyCourse() {
    try {
      const registrationIds = course.moms?.items.map(
        (registration) => registration!.id
      );
      if (registrationIds) {
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
      }
      await client.graphql({
        query: deleteCourse,
        variables: {
          input: {
            id: course.id,
          },
        },
      });
      closeMenu();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  }

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
              onPress={() => {
                navigation.navigate("CourseEdit", { course });
                closeMenu();
              }}
            />
            <Menu.Item
              onPress={() => {
                openConfirmation();
                closeMenu();
              }}
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
    top: 0,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    position: "absolute",
    top: 0,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    flex: 1,
  },
});
