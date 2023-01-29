import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { date } from "yup";
import baseUrl from "../lib/baseUrl";
import { useAppContext } from "../lib/Context";
import { useNavigation } from "@react-navigation/native";
interface Inventory {
  expiresIn?: number;
  prdID?: string;
  name?: string;
  value?: string;
  id?: string;
  zone?: string;
  block?: string;
  rack?: string;
  importDate?: string;
  exportDate?: string;
  expiryDate?: string;
  img?: string;
  locId?: string;
  description?:string
}
const InventoryCard = (props: Inventory) => {
  const navigation = useNavigation();
  const auth = useAppContext();
  const currDate = new Date();
  //@ts-ignore
  const impDate = new Date(props?.importDate);
  //@ts-ignore
  const expiryDate = new Date(props?.expiryDate);
  const [zone, setzone] = useState('')
  const [block, setblock] = useState('')
  const [rack, setrack] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl + "/space/" + props.locId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user.token}`,
        },
      })
      .then((val) => {
        setblock(val.data.data.block);
        setzone(val.data.data.zone);
        setrack(val.data.data.rack);
      });
  }, []);
  const onExportPressed = ()=>{
    axios.post(
      baseUrl+"/transaction/create",
      {
        prdID: props.prdID,
        prdName: props.name,
        prdValue: props.value,
        prdImg: props.img,
        prdDesc: props.description,
        expiryDate: props.expiryDate,
        exportDate: currDate.toISOString(),
        importDate: props.importDate,
        status:'Export'
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user.token}`,
        },
      }
    ).then(val=>{
      if(val.data.status==="SUCCESS"){
        // navigation.popToTop();
        axios.delete(baseUrl+"/product/delete/"+props.id,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }).then(val=>navigation.goBack())
      }
      else{
        alert('Error in submitting')
      }
    })
  }
  const onPutAway = ()=>{
    axios.post(
      baseUrl+"/transaction/create",
      {
        prdID: props.prdID,
        prdName: props.name,
        prdValue: props.value,
        prdImg: props.img,
        prdDesc: props.description,
        expiryDate: props.expiryDate,
        importDate: props.importDate,
        exportDate: currDate.toISOString(),
        status:'Put Away'
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user.token}`,
        },
      }
    ).then(val=>{
      if(val.data.status==="SUCCESS"){
        // navigation.popToTop();
        axios.delete(baseUrl+"/product/delete/"+props.id,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }).then(val=>navigation.goBack())
      }
      else{
        alert('Error in submitting')
      }
    })
  }

  console.log(props.importDate);
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
          {/* @ts-ignore */}
          Since {Math.floor((currDate - impDate) / (1000 * 60 * 60 * 24))} Days
        </Text>
        <Text style={{ color: "#FF2F3B", opacity: 0.8 }}>
          Expires in{" "}
          {/* @ts-ignore */}
          {Math.floor((expiryDate - currDate) / (1000 * 60 * 60 * 24))} Days
        </Text>
      </View>
      <View style={{ marginTop: 15, marginLeft: 5, flexDirection: "row" }}>
        <Image
          source={{ uri: props.img }}
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
            Import Date : {impDate.toDateString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Zone: {zone}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Block: {block}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 14, color: "#beb0be" }}>
          Rack: {rack}
        </Text>
      </View>
      {!props?.exportDate && (
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderWidth: 0.96,
              borderColor: "#ce4848",
              borderRadius: 8,
            }}
            onPress={() => console.log("Report")}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#ce5656",
                fontSize: 14,
                letterSpacing: 0.4,
                fontWeight: "400",
              }}
            >
              Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderWidth: 0.96,
              borderColor: "#cec084",
              borderRadius: 8,
            }}
            onPress={() => onPutAway()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#cec088",
                fontSize: 14,
                letterSpacing: 0.4,
                fontWeight: "300",
              }}
            >
              Put Away
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderWidth: 0.96,
              borderColor: "#48c048",
              borderRadius: 8,
            }}
            onPress={() => onExportPressed()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#88c088",
                fontSize: 14,
                letterSpacing: 0.8,
                fontWeight: "600",
              }}
            >
              Export
            </Text>
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
