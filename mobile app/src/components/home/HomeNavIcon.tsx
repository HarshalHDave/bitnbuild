import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeNavIcon = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={{ alignSelf: "center", position: "absolute" }}
        name="person"
        size={24}
        color="#9e909e"
      />
    </View>
  );
};

export default HomeNavIcon;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
