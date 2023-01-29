import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Blocks = ({ navigation, route }: any) => {
  const zone = route.params;
  const blockData = ["BAb", "Bac", "BAw"];
  const BlockView = ({ block }: any) => (
    <TouchableOpacity
      style={{ flex: 1, margin: 8, padding: 8, backgroundColor: "white", justifyContent: 'center', alignItems: 'center', height: 128 }}
      onPress={() => { navigation.navigate("RackScreen", { zoneName: zone, blockName: block }) }}
    >
      <Text style={{ color: "black" }}>{zone}</Text>
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
        renderItem={(val) => <BlockView block={val.item}></BlockView>}
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
