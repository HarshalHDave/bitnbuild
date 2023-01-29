import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'
import OrderCard from '../components/OrderCard'
import HomeNavIcon from '../components/home/HomeNavIcon'
import Navbar from '../components/Navbar'

const Orders = () => {
  return (
    <SafeArea>
      <>
      <Navbar title="3rd Party API Token"  />
        <View style={{flex: 1, padding: 16}}>
          <Text style={{ color: "#eee0ee", fontSize: 18 }}>Copy and share this authorization token to allow 3rd party apps to manage your inventory.</Text>
          <View style={{ margin: 20, padding: 15, marginTop: 30, borderRadius: 20, justifyContent: 'center', alignItems: "center", height: "auto", elevation: 7 }}>
            <Text style={{textAlign: 'center', fontSize: 14, color: '#ded0de'}} selectable={true}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJiYXJmaSIsImlhdCI6MTY3NDkxMjAxOCwiZXhwIjoxNzA2NDQ4MDE4fQ.U5Xtdu7E5SIu4XWnaDXiF0kdF2QdK4FBbRguqzq3bbM</Text>
          </View>
          <TouchableOpacity 
          style={{padding: 16, width: '100%', borderRadius: 8, borderWidth: 0.8, borderColor: "#cec0ce", alignItems: 'center', justifyContent: 'center'}}
            onPress={() => { Linking.openURL("http://adhesive-rat.surge.sh/postman_documentation.html#admin-product")}}>
            <Text style={{ color: "#48EFEF", fontSize: 16, textAlign: 'center', fontWeight: '600' }}>See Documentation</Text>
          </TouchableOpacity>
          <Text style={{color: "#beb0be", fontSize: 14, position: 'absolute', bottom: 16}}>Share this token with the parties you trust. They will have the acces to view and alter the data in your invneotry.</Text>
        </View>
      </>
    </SafeArea>
  )
}

export default Orders

const styles = StyleSheet.create({})