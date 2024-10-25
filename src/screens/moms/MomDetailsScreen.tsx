import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
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
import { Mom as MomDto } from "../../API";

type MomDetailsScreenRouteProp = RouteProp<RootStackParamList, "MomDetails">;
const client = generateClient();

const MomDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MomDetailsScreenRouteProp>();

  const { mom: initialMom } = route.params;
  const [mom, setMom] = useState<MomDto>(initialMom);
  const [visible, setVisible] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
                console.log("edit");
              }}
            />
            <Menu.Item
              onPress={() => {
                console.log("delete");
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
          <MomDetailsCard mom={mom} />
        </View>
      </View>
    </PaperProvider>
  );
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
