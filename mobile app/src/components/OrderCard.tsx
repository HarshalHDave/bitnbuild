import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

interface OrderCard {
  status?: string;
  expiresIn?: number;
  productId?: string;
  productName?: string;
  productValue?: string;
  onAccept?: () => void;
  onReject?: () => void;
}
const OrderCard = (props: OrderCard) => {
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
        <Text style={{ color: "#48EFEF", opacity: 0.8, fontWeight: "400" }}>
          {props.status}
        </Text>
        {props.expiresIn && props.expiresIn > 5 ? (
          <Text style={{ color: "#b0b0be" }}>
            In shelf for {props.expiresIn} days
          </Text>
        ) : (
          <Text style={{ color: "#FF2F3B", opacity: 0.8 }}>
            Expires in {props.expiresIn}
          </Text>
        )}
      </View>
      <View style={{ marginTop: 8, marginLeft: 8, flexDirection: "row" }}>
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
            #{props.productId}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#beb0be",
              marginBottom: 8,
            }}
          >
            {props.productName}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#cec0ce" }}>
            ₹ {props.productValue}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 8 }}>
        <TouchableOpacity
          style={{ width: '48%', alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 0.96, borderColor: '#ce4848', borderRadius: 8 }}
          onPress={() => console.log("Reject")}>
          <Text style={{ textAlign: 'center', color: '#ce5656', fontSize: 14, letterSpacing: 0.4, fontWeight: '400' }}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '48%', alignItems: 'center', justifyContent: 'center', padding: 8, borderWidth: 0.96, borderColor: '#48c048', borderRadius: 8 }}
          onPress={() => console.log("Accept")}>
          <Text style={{ textAlign: 'center', color: '#88c088', fontSize: 14, letterSpacing: 0.8, fontWeight: '600' }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#0A2135",
    padding: 8,
    paddingTop: 4,
    borderRadius: 8,
  },
});
