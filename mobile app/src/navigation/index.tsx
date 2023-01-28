import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "../lib/Context";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

const index = () => {
  const auth = useAppContext();
  return auth?.user ? <UserStack /> : <AuthStack />;
};

export default index;

const styles = StyleSheet.create({});
