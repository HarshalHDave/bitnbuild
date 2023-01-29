import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import InventoryCard from "../../components/InventoryCard";
import baseUrl from "../../lib/baseUrl";
import axios from "axios";
import { useAppContext } from "../../lib/Context";
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
const RackScreen = ({ route , navigation}: any) => {
  const routeData = route.params;
  const auth = useAppContext();
  const [Racks, setRacks] = useState([]);
  useEffect(() => {
    axios
      .post(
        baseUrl + "/space/list",
        {
          query: {},
          options: {
            group: "rack",
            where: {
              zone: routeData.zoneName,
              block: routeData.blockName,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }
      )
      .then((val) => {
        const arr = [];
        val.data.data.data.map((item: any) => {
          arr.push(item.rack);
        });
        setRacks(arr);
      });
  }, []);
  const RackView = ({ rack }: any) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 8,
        padding: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: 128,
      }}
      onPress={() => {navigation.navigate("Products",{...routeData,rackName:rack})}}
    >
      <Text style={{ color: "black" }}>{rack}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.background_main}>
      <Text style={{ color: "#eee0ee", fontSize: 20, fontWeight: "400" }}>
        Racks in zone:{routeData.zoneName} block:{routeData.blockName}
      </Text>
      <FlatList
        numColumns={2}
        data={Racks}
        renderItem={(val) => <RackView rack={val.item}></RackView>}
        keyExtractor={(item) => item}
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
