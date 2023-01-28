import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface FabButtonProps {
  onImportPress: () => void;
}
const FabButton = ({ onImportPress }: FabButtonProps) => {
  const [IsFabActive, setIsFabActive] = useState(false);
  return (
    <>
      <FAB
        icon="plus"
        customSize={65}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 16,
          backgroundColor: "white",
          borderRadius: 65,
          zIndex: 10,
        }}
        onPress={() => setIsFabActive(!IsFabActive)}
      />
      {/* FAB Buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 75,
          right: 0,
          display: IsFabActive ? "flex" : "none",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: 0,
            right: 0,
            margin: 16,
            backgroundColor: "white",
            borderRadius: 65,
            height: 65,
            width: 65,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onImportPress}
        >
          <MaterialCommunityIcons name="import" size={24} color="black" />
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>Import</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FabButton;

const styles = StyleSheet.create({});
