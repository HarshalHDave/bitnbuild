import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
// import { useSpaceManageContext } from "../../lib/SpaceContext";

const Zones = ({ route ,navigation}: any) => {
  const zoneData = ["A", "B", "C"];
  const ZoneView = ({zone}: any) => (
    <TouchableOpacity
      style={{ flex: 1, margin: 8, padding: 8, backgroundColor: "white", justifyContent: 'center', alignItems: 'center', height: 128 }}
      onPress={() => {navigation.navigate('Blocks',zone)}}
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
