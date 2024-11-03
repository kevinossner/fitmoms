import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import Ionicons from "@expo/vector-icons/Ionicons";
import MomDetailsCard from "../../components/MomDetailsCard";
import { Button, Menu, PaperProvider } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { generateClient } from "aws-amplify/api";
import { registrationsByMomId } from "../../graphql/queries";
import {
  deleteMom,
  updateMom,
  deleteRegistration,
} from "../../graphql/mutations";
import { Mom as MomDto } from "../../API";

type MomDetailsScreenRouteProp = RouteProp<RootStackParamList, "MomDetails">;
const client = generateClient();

const MomDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<MomDetailsScreenRouteProp>();

  const { mom: initialMom } = route.params;
  const [mom, setMom] = useState<MomDto>(initialMom);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.mom) {
        setMom(route.params.mom);
      }
    }, [route.params?.mom])
  );

  async function updateNotes(newNotes: string): Promise<void> {
    await client.graphql({
      query: updateMom,
      variables: {
        input: {
          id: mom.id!,
          notes: newNotes,
        },
      },
    });
  }

  function openConfirmation() {
    Alert.alert(
      "Bist du sicher?",
      "Teilnehmerin wird unwiderruflich gelöscht",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        { text: "Bestätigen", onPress: () => destroyMom() },
      ]
    );
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
                navigation.navigate("MomEdit", { mom });
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
          <MomDetailsCard mom={mom} onNotesChange={updateNotes} />
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
