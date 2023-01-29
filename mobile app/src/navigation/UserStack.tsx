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
import AiPrediction from "../screens/AiPrediction";
import Profile from "../screens/Profile";
import EmployeeManage from "../screens/EmployeeManage";
import SosCall from "../screens/SosCall";
import PutAway from "../screens/PutAway";

const UserStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Transanctions" component={Transanctions} />
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="Inv_anal" component={Inv_anal} />
      <Stack.Screen name="Trans_anal" component={Trans_anal} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="ImportForm" component={ImportForm} />
      <Stack.Screen name="SpaceManage" component={SpaceManage} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      <Stack.Screen name="AiPrediction" component={AiPrediction}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="EmployeeManage" component={EmployeeManage}/>
      <Stack.Screen name="SosCall" component={SosCall}/>
      <Stack.Screen name="PutAway" component={PutAway}/>
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
