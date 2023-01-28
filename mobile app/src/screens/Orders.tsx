import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'
import OrderCard from '../components/OrderCard'
import HomeNavIcon from '../components/home/HomeNavIcon'
import Navbar from '../components/Navbar'

const Orders = () => {
  return (
    <SafeArea>
      <>
      <Navbar title="Order Management"  />
      <OrderCard/>
      </>
    </SafeArea>
  )
}

export default Orders

const styles = StyleSheet.create({})