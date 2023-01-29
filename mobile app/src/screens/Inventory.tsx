import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import InventoryCard from "../components/InventoryCard";
import axios from "axios";
import baseUrl from "../lib/baseUrl";
import { useAppContext } from "../lib/Context";
// const DATA = [
//   {
//     status: "imported",
//     expiresIn: 10,
//     productId: "ABC4",
//     productName: "Harshal Fruit,",
//     productValue: "1000",
//     zone: "AB",
//     block: "A",
//     rack: "1st",
//     importDate: "1/23",
//     exportDate: undefined,
//   },
// ];

const Inventory = ({ navigation }: any) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [DateFilter, setDateFilter] = useState("");
  const auth = useAppContext();
  useEffect(() => {
    axios
      .post(
        baseUrl + "/product/list",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }
      )
      .then((val) => {
        setData(val.data.data.data);
        setLoading(false);
      });
  }, []);

  // console.log(Data)
  return (
    <SafeArea>
      <>
        <Navbar
          title="Inventory"
          iconComponent={
            <View
              style={{ marginRight: 8, marginTop: 4, flexDirection: "row" }}
            >
              <Feather onPress={()=>navigation.navigate("PutAway")} name="trash-2" size={16} color="white" />
              <Fontisto
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate("Inv_anal")}
                name="bar-chart"
                size={16}
                color="#cec0ce"
              />
            </View>
          }
        />
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "#64EAEA",
          }}
          style={{
            height: 80,
            paddingBottom: 4,
            marginBottom: 16,
            borderRadius: 4,
          }}
          calendarHeaderStyle={{
            color: "#beb0be",
            fontWeight: "600",
            fontSize: 14,
          }}
          calendarColor={"#0A2135"}
          calendarHeaderContainerStyle={{
            backgroundColor: "#0A0D30",
            padding: 4,
          }}
          onDateSelected={(date) => {
            //@ts-ignore
            setDateFilter(date);
          }}
          // dayContainerStyle={{borderRadius: 4}}
          dateNumberStyle={{ color: "#cec0ce" }}
          dateNameStyle={{ color: "#cec0ce" }}
          highlightDateNumberStyle={{ color: "#64EAEA" }}
          highlightDateNameStyle={{ color: "#64EAEA" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          iconContainer={{ flex: 0.1 }}
        />
        <View style={[styles.container]}>
          <View style={[styles.searchBar]}>
            <Ionicons name="search" size={24} color="#8e808e" />
            <TextInput
              style={styles.input}
              placeholder={"Search Something"}
              value={searchPhrase}
              onChangeText={(text) => {
                setSearchPhrase(text);
              }}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        {!Loading && (
          // <ScrollView>
          //   {Data.map(val=><InventoryCard id={""} />)}
          // </ScrollView>
          <FlatList
            data={Data}
            pagingEnabled
            //@ts-ignore
            renderItem={({ item }) => {
              //@ts-ignore
              if (DateFilter) {
                //@ts-ignore
                const impDate = new Date(item.importDate);
                const selectedDate = new Date(DateFilter);
                //@ts-ignore
                if (selectedDate - impDate > 0) {
                  //@ts-ignore
                  return <InventoryCard id={""} {...item} />;
                }
              } else {
                //@ts-ignore
                return <InventoryCard id={""} {...item} />;
              }
            }}
            //@ts-ignore
            keyExtractor={(item) => item.id}
          />
        )}
      </>
    </SafeArea>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",
    width: "99%",
    backgroundColor: "#0A0D30",
    borderWidth: 0.6,
    borderColor: "#aea0ae",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    marginLeft: 8,
    width: "100%",
    color: "grey",
  },
});
