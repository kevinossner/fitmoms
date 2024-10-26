import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamListType";
import { StackNavigationProp } from "@react-navigation/stack";
import { generateClient } from "aws-amplify/api";
import { Mom as MomDto } from "../../API";
import { listMomsWithRelations } from "../../graphql/queries";
import Ionicons from "@expo/vector-icons/Ionicons";
import MomCard from "../../components/MomCard";

const client = generateClient();

const MomsOverviewScreen = () => {
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [moms, setMoms] = useState<MomDto[]>([]);

  const fetchData = async () => {
    try {
      const result = await client.graphql({
        query: listMomsWithRelations,
      });

      if ("data" in result) {
        const fetchedMoms = result.data.listMoms.items as MomDto[];
        fetchedMoms.sort((a, b) => {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;

          return 0;
        });
        setMoms(fetchedMoms);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch moms data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{moms.length}</Text>
      <FlatList
        data={moms}
        renderItem={({ item: mom }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MomDetails", { mom })}
          >
            <MomCard mom={mom} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MomAdd")}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default MomsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  counter: {
    marginRight: 20,
    color: "#666666",
    textAlign: "right",
  },
  addButton: {
    position: "absolute",
    bottom: 20, // Adjust the position from the bottom
    right: 30, // Adjust the position from the right
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#720039",
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Center the icon inside the button
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Add some elevation to the button for shadow
  },
});
