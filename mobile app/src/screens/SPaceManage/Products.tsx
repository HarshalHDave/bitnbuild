import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../lib/baseUrl";
import { useAppContext } from "../../lib/Context";
import InventoryCard from "../../components/InventoryCard";
import FabButton from "../../components/FabButton";

const Products = ({ route , navigation}: any) => {
  const auth = useAppContext();
  const routeData = route.params;
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        baseUrl + "/space/list",
        {
          query: {},
          options: {
            where: {
              zone: routeData.zoneName,
              block: routeData.blockName,
              rack: routeData.rackName,
            },
            select: ["id"],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.user.token}`,
          },
        }
      )
      .then((val) => {
        const arr = [];
        console.log(val.data.data.data);
        val.data.data.data.map((item: any) => {
          arr.push(item.id);
        });
        console.log(arr);
        axios
          .post(
            baseUrl + "/product/list",
            {
              query: {},
              options: {
                where: {
                  locId: arr,
                },
              },
              isCountOnly: false,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.user.token}`,
              },
            }
          )
          .then((val) => {
            // console.log(val.data.data.data)
            setData(val.data.data.data);
            // setLoading(false);
          });
        // setZoneData(arr);
      });
  }, []);
  return (
    <View style={styles.background_main}>
      <Text style={{ color: "#eee0ee", fontSize: 20, fontWeight: "400" }}>
        Products in zone:{routeData.zoneName} block:{routeData.blockName} rack:
        {routeData.rackName}
      </Text>
      {/* <FlatList
        numColumns={2}
        data={Racks}
        renderItem={(val) => <RackView rack={val.item}></RackView>}
        keyExtractor={(item) => item}
      /> */}
      {Data.length === 0 && (
        <>
          <Text style={{ color: "white" }}>No Products Available</Text>
          <FabButton onImportPress={()=>{navigation.navigate('ImportForm')}}/>
        </>
      )}
      <FlatList
        data={Data}
        pagingEnabled
        //@ts-ignore
        renderItem={({ item }) => {
          return <InventoryCard id={""} {...item} />;
        }}
        //@ts-ignore
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#0A0D30",
    paddingBottom: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
