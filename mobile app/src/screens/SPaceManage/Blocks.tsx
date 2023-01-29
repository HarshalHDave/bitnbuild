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

const Blocks = ({ navigation, route }: any) => {
  const zone = route.params;
  const auth = useAppContext();
  const [blockData, setBlockData] = useState([]);
  useEffect(() => {
    axios.post(baseUrl + "/space/list", {
      query: {},
      options: {
        group: "block",
        where: {
          zone : zone
        },
      },
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.user.token}`,
      },
    }).then(val=>{
      const arr = [];
      console.log(val.data.data.data)
      val.data.data.data.map((item:any)=>{
        arr.push(item.block);
      })
      setBlockData(arr);
    });
  }, []);
  const BlockView = ({ block }: any) => (
    <TouchableOpacity
      style={{ flex: 1, margin: 8, padding: 8, backgroundColor: "white", justifyContent: 'center', alignItems: 'center', height: 128 }}
      onPress={() => { navigation.navigate("RackScreen", { zoneName: zone, blockName: block }) }}
    >
      <Text style={{ color: "black" }}>{block}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.background_main}>
      <Text style={{ color: "#eee0ee", fontSize: 20, fontWeight: "400" }}>
        Blocks in zone: {zone}
      </Text>
      <FlatList
        numColumns={2}
        data={blockData}
        renderItem={(val) => {
          console.log(val.item)
          return<BlockView block={val.item}></BlockView>
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Blocks;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#0A0D30",
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});
