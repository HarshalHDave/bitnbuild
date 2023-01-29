import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Zones from "./SPaceManage/Zones";
import Blocks from "./SPaceManage/Blocks";
import RackScreen from "./SPaceManage/RackScreen";
import Products from "./SPaceManage/Products";
// import {
//   SpaceContextProvider,
// } from "../lib/SpaceContext";

const SpaceManage = () => {
  const Stack = createNativeStackNavigator();
  //   alert(Object.keys(Data));
  return (
    <SafeArea>
      <>
        <Navbar title="Space Management" />
        {/* <SpaceContextProvider> */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Zones"
        >
          <Stack.Screen name="Zones" component={Zones} />
          <Stack.Screen name="Blocks" component={Blocks} />
          <Stack.Screen name="RackScreen" component={RackScreen} />
          <Stack.Screen name="Products" component={Products} />
        </Stack.Navigator>
        {/* </SpaceContextProvider> */}
      </>
    </SafeArea>
  );
};

export default SpaceManage;

const styles = StyleSheet.create({});
