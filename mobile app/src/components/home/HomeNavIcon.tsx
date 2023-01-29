import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeNavIcon = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Ionicons
        style={{ alignSelf: "center", position: "absolute" }}
        name="person"
        size={24}
        color="#9e909e"
        //@ts-ignore
        onPress={()=>{navigation.navigate("Profile")}}
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
