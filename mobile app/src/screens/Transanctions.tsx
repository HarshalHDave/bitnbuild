import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import TransCard from "../components/TransCard";
import FabButton from "../components/FabButton";
const DATA = [
  {
    status: "Imported",
    expiresIn: 5,
    productId: "JHV769876",
    productName: "Addidas ,Sports Shoes Manf. 30/12/2022, tribute to bolt",
    productValue: "1000",
    zone: "AB",
    block: "A",
    rack: "1st",
  },
];
const Transanctions = ({ navigation }: any) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <SafeArea>
      <>
        <Navbar
          title="Transanctions"
          iconComponent={
            <View style={{ marginRight: 8, marginTop: 4 }}>
              <Fontisto
                onPress={() => navigation.navigate("Trans_anal")}
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
        {/* FAB BUTTON */}
        <FabButton
          onExportPress={() => navigation.navigate("")}
          onImportPress={() => navigation.navigate("ImportForm")}
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
          renderItem={({ item }) => <TransCard {...item} />}
          keyExtractor={(item) => item.zone + item.block + item.rack}
        />
      </>
    </SafeArea>
  );
};

export default Transanctions;

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
