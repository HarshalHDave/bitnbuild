import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
interface Inventory {
  status?: string;
  expiresIn?: number;
  prdID?: string;
  name?: string;
  value?: string;
  zone?: string;
  block?: string;
  rack?: string;
  importDate?: string;
  exportDate?: string;
}
const InventoryCard = (props: Inventory, { navigation }: any) => {
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
        <Text style={{ color: "#beb0be", opacity: 0.8, fontWeight: "400" }}>
          {props.status}
        </Text>
        <Text style={{ color: "#FF2F3B", opacity: 0.8 }}>
          Expires in {props.expiresIn}
        </Text>
      </View>
      <View style={{ marginTop: 15, marginLeft: 5, flexDirection: "row" }}>
        <Image
          source={{ uri: "https://source.unsplash.com/random" }}
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
            #{props.prdID}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#beb0be",
              marginBottom: 8,
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#cec0ce",
              marginBottom: 12,
            }}
          >
            ₹ {props.value}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
            {props.importDate} -{" "}
            {props?.exportDate ? (
              <Text>{props?.exportDate}</Text>
            ) : (
              <Text>Present</Text>
            )}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Zone: {props.zone}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Block: {props.block}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Rack: {props.rack}
        </Text>
      </View>
      {!props?.exportDate && (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 8 }}>
          <TouchableOpacity
            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 0.96, borderColor: '#ce4848', borderRadius: 8 }}
            onPress={() => console.log("Report")}>
            <Text style={{ textAlign: 'center', color: '#ce5656', fontSize: 14, letterSpacing: 0.4, fontWeight: '400' }}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 0.96, borderColor: '#cec084', borderRadius: 8 }}
            onPress={() => console.log("PutAway")}>
            <Text style={{ textAlign: 'center', color: '#cec088', fontSize: 14, letterSpacing: 0.4, fontWeight: '300' }}>Put Away</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '30%', alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 0.96, borderColor: '#48c048', borderRadius: 8 }}
            onPress={() => console.log("Export")}>
            <Text style={{ textAlign: 'center', color: '#88c088', fontSize: 14, letterSpacing: 0.8, fontWeight: '600' }}>Export</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InventoryCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#0A2135",
    padding: 8,
    paddingTop: 4,
    borderRadius: 8,
  },
});
