import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeArea from "../components/SafeArea";
import { useAppContext } from "../lib/Context";
import Navbar from "../components/Navbar";

const Profile = () => {
  const auth = useAppContext();
  return (
    <SafeArea>
      <>
        <Navbar
          title="Your Profile"
          iconComponent={
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: "white" ,borderRadius:15}}
              onPress={() => {auth?.signOut()}}
            >
              <Text>LogOut</Text>
            </TouchableOpacity>
          }
        />
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your Email : {auth?.user.email}</Text>
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your Name : {auth?.user.name}</Text>
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your userName : {auth?.user.username}</Text>
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your Phone : {auth?.user.mobileNumber}</Text>
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your city : {auth?.user.city}</Text>
        <Text style={{fontWeight:'bold',fontSize:18, color:'white'}}>Your address : {auth?.user.address}</Text>
      </>
    </SafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({});
