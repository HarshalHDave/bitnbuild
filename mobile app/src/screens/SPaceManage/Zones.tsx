import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../lib/baseUrl";
import { useAppContext } from "../../lib/Context";
// import { useSpaceManageContext } from "../../lib/SpaceContext";

const Zones = ({ route, navigation }: any) => {
  const auth = useAppContext();
  const [zoneData, setZoneData] = useState([]);
  useEffect(() => {
    axios.post(baseUrl + "/space/list", {
      query: {},
      options: {
        group: "zone",
        where: {
        },
      },
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.user.token}`,
      },
    }).then(val=>{
      const arr = [];
      val.data.data.data.map((item:any)=>{
        arr.push(item.zone);
      })
      setZoneData(arr);
    });
  }, []);
  // const zoneData = ["A", "B", "C"];
  const ZoneView = ({ zone }: any) => (
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
      onPress={() => {
        navigation.navigate("Blocks", zone);
      }}
    >
      <Text style={{ color: "black" }}>{zone}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.background_main}>
      <Text style={{ color: "#eee0ee", fontSize: 20, fontWeight: "400" }}>
        Your Zones
      </Text>
      <FlatList
        numColumns={2}
        data={zoneData}
        renderItem={(val) => <ZoneView zone={val.item}></ZoneView>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Zones;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#0A0D30",
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});
