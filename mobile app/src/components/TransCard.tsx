import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

interface Transanction {
  addedBy: number;
  createdAt: string;
  expiryDate: string;
  exportDate: null | "";
  id: number;
  importDate: string;
  isActive: boolean;
  isDeleted: boolean;
  prdDesc: string;
  prdId: "";
  prdImg: string;
  prdName: string;
  prdValue: number;
  status: string;
  updatedAt: string;
  updatedBy: null | "";
}
const TransCard = (props: Transanction) => {
  const expiryDate = new Date(props.expiryDate);
  const exportDate = new Date(props.exportDate);
  const importDate = new Date(props.importDate);

  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingBottom: 4,
          borderBottomColor: "#454545",
          borderBottomWidth: 0.8,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: props.status != "Put Away" ? "#48EFEF" : "yellow",
            opacity: 0.8,
            fontWeight: "400",
          }}
        >
          {props.status}
        </Text>
        {props.prdId && props.prdId.length == 6 ? (
          <Text style={{ color: "#b0b0be" }}>Internal</Text>
        ) : (
          <Text style={{ color: "#FF2F3B", opacity: 0.8 }}>External</Text>
        )}
      </View>
      <View style={{ marginTop: 8, marginLeft: 8, flexDirection: "row" }}>
        <Image
          source={{ uri: props.prdImg }}
          // resizeMode="contain"
          style={{ height: "100%", width: "32%", borderRadius: 4 }}
        ></Image>
        <View style={{ marginLeft: 8, width: "64%" }}>
          <Text
            style={{
              color: "#beb0be",
              fontSize: 12,
              fontWeight: "600",
              letterSpacing: 0.4,
              marginBottom: 2,
            }}
          >
            #{props.prdId}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#beb0be",
              marginBottom: 8,
            }}
          >
            {props.prdName}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#cec0ce" }}>
            ₹ {props.prdValue}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#9e909e" }}>
          Expiry: {expiryDate.toLocaleString()}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#9e909e" }}>
          Import: {importDate.toLocaleString()}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#9e909e" }}>
          Export: {exportDate.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#0A2135",
    padding: 8,
    paddingTop: 4,
    borderRadius: 8,
  },
});
