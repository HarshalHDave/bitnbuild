import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import InventoryCard from "../components/InventoryCard";
const DATA = [
  {
    "id": 1,
    "isDeleted": false,
    "isActive": true,
    "createdAt": "2023-01-28T14:32:38.000Z",
    "updatedAt": "2023-01-28T14:32:38.000Z",
    "addedBy": 2,
    "updatedBy": null,
    "prdID": "XUN158",
    "name": "Parle G Biscuit (Pack of 200 x ?10)",
    "value": 2000,
    "img": "https://www.jiomart.com/images/product/150x150/490008739/parle-g-original-glucose-biscuits-800-g-product-images-o490008739-p490008739-0-202203170454.jpg",
    "description": "Parle-G Original Glucose Biscuits are filled with the goodness of milk and wheat. Parle-G has been a source of all-round nourishment for growing kids and it has also been an all-time favourite choice for years. Whatever be the occasion, it has always been",
    "expiryDate": "2024-02-01T00:06:04.000Z",
    "importDate": "2023-01-01T05:59:58.000Z",
    "exportDate": null,
    "locId": 1
  }
];

const Inventory = ({ navigation }: any) => {

  const [searchPhrase, setSearchPhrase] = useState("");
  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, "days"), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, "days")];
  return (
    <SafeArea>
      <>
        <Navbar
          title="Inventory"
          iconComponent={
            <View style={{ marginRight: 8, marginTop: 4 }}>
              <Fontisto
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
        <FlatList
          data={DATA}
          renderItem={({ item }) => <InventoryCard {...item} />}
          keyExtractor={(item) => item.id}
        />
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
