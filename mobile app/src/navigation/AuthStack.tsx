import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ImportForm from "../screens/ImportForm";
import Inventory from "../screens/Inventory";
import Inv_anal from "../screens/Inv_anal";
import Orders from "../screens/Orders";
import ScannerScreen from "../screens/ScannerScreen";
import SpaceManage from "../screens/SpaceManage";
import Transanctions from "../screens/Transanctions";
import Trans_anal from "../screens/Trans_anal";
import Login from "../screens/Login";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
