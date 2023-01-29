import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import axios from "axios";
import baseUrl from "../lib/baseUrl";
import { useAppContext } from "../lib/Context";
import TransCard from "../components/TransCard";

const PutAway = () => {
  const auth = useAppContext();
  const [Data, setData] = useState([]);
  // const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post(
        baseUrl + "/transaction/list",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }
      )
      .then((val) => {
        const filteredData = val.data.data.data.filter(
          (item) => item.status == "Put Away"
        );

        // setLoading(false);
        setData(filteredData);
      });
  }, []);
  return (
    <SafeArea>
      <>
        <Navbar title="Products Put Away"></Navbar>
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return <TransCard id={item.id} {...item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </>
    </SafeArea>
  );
};

export default PutAway;

const styles = StyleSheet.create({});
