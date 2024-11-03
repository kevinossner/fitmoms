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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [moms, setMoms] = useState<MomDto[]>([]);
  const [filterOpenBills, setFilterOpenBills] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [filterOpenBills])
  );

  const toggleFilter = () => {
    setFilterOpenBills((prev) => !prev);
  };

  const fetchData = async () => {
    try {
      const result = await client.graphql({
        query: listMomsWithRelations,
      });

      if ("data" in result) {
        let fetchedMoms = result.data.listMoms.items as MomDto[];
        fetchedMoms.sort((a, b) => {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;

          return 0;
        });
        if (filterOpenBills) {
          fetchedMoms = fetchedMoms.filter((mom) => mom.openBills);
        }

        setMoms(fetchedMoms);
      }
    } catch (error) {
      Alert.alert("Error", "Daten konnten nicht geladen werden.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={toggleFilter}>
          <Ionicons name="filter-circle-outline" size={34} color="#720039" />
        </TouchableOpacity>
        <Text style={styles.counter}>{moms.length}</Text>
      </View>
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
  headerRow: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Spread items to opposite ends
    alignItems: "center", // Center items vertically
    paddingHorizontal: 10,
    marginVertical: 0,
  },
  counter: {
    color: "#666666",
    textAlign: "right",
    marginRight: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#720039",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  filterButton: {
    padding: 10,
    borderColor: "#720039",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    width: 150,
  },
  filterButtonText: {
    color: "#720039",
  },
});
