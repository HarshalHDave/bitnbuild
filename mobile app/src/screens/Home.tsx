import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import HomeNavIcon from "../components/home/HomeNavIcon";

const Home = ({ navigation }: any) => {
  return (
    <SafeArea>
      <>
        <Navbar title="AnyTracker" iconComponent={<HomeNavIcon />} />
        
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Transanctions")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/report.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>Transanctions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Inventory")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/inventorymanagment.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>Inventory Management</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Orders")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/api.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Orders")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/forecasting.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>AI Forecasting</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("SpaceManage")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/space.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>Space Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '48%', height: 152, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate("Orders")}>
            <Image
              source={{ uri: "https://inventory-icons-bnb.surge.sh/employees.png" }}
              resizeMode="contain"
              style={{ height: '48%', width: '72%', borderRadius: 4 }}
            ></Image>
            <Text style={{ textAlign: 'center', color: '#eee0ee', margin: 4, fontSize: 16, letterSpacing: 1.2 }}>Employee Management</Text>
          </TouchableOpacity>
        </View>
      </>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "white",
  },
});
