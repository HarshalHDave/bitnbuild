import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import InventoryCard from "../../components/InventoryCard";
const DATA = [
  {
    status: "imported",
    expiresIn: 10,
    productId: "ABC4",
    productName: "Harshal Fruit,",
    productValue: "1000",
    zone: "AB",
    block: "A",
    rack: "1st",
    importDate: "1/23",
    exportDate: undefined,
  },
];
const RackScreen = ({ route }: any) => {
  console.log(JSON.stringify(route.params));
  return (
    <View style={styles.background_main}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <InventoryCard {...item} />}
        keyExtractor={(item) => item.zone + item.block + item.rack}
      />
    </View>
  );
};

export default RackScreen;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#0A0D30",
    paddingBottom: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
