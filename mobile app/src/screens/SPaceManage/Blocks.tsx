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
      style={{ padding: 25, margin: 25, backgroundColor: "white" }}
      onPress={() => {
        navigation.navigate("RackScreen", {zoneName:zone , blockName:block });
      }}
    >
      <Text style={{ color: "black" }}>{block}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.background_main}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
          Your Blocks
        </Text>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
          Zone : {zone}
        </Text>
      </View>
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
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
