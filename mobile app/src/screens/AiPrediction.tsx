import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import baseUrl from "../lib/baseUrl";
import { useAppContext } from "../lib/Context";
import AiCard from "../components/AiCard";
import Navbar from "../components/Navbar";

const AiPrediction = () => {
  useEffect(() => {}, []);
  const [ShowDatePicker, setShowDatePicker] = useState(true);
  const [SelectedDate, setSelectedDate] = useState("");
  const auth = useAppContext();
  const [Data, setData] = useState([]);
  // const [Loading, setLoading] = useState(true);
  const fetchData = () => {
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
        // setLoading(false);
        setData(val.data.data.data);
      });
  };
  return (
    <SafeArea>
      <>
        <Navbar title="AI Report" />
        {ShowDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={(change, date) => {
              if (change.type === "set") {
                date?.setFullYear(date?.getFullYear() - 6);
                const dateToQuery = date?.toISOString().split("T")[0];
                setTimeout(() => {
                  fetchData();
                }, 5000);
              }
              setShowDatePicker(false);
            }}
          />
        )}
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return <AiCard id={item.id} {...item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </>
    </SafeArea>
  );
};

export default AiPrediction;

const styles = StyleSheet.create({});
