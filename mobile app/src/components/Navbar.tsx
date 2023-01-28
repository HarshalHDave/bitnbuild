import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface navBar {
  title: string;
  iconComponent?: JSX.Element;
}
const Navbar = ({ title, iconComponent }: navBar) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" , alignItems:'center', paddingBottom: 8, marginBottom: 4, borderBottomColor: "#aea0ae", borderBottomWidth: 0.4, paddingHorizontal: 4 }}>
      <Text style={{ fontWeight: "400", fontSize: 24, color: "#dedede", letterSpacing: 0.8 }}>{title}</Text>
      {iconComponent}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
