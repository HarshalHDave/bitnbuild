import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
// import { useSpaceManageContext } from "../../lib/SpaceContext";

const Zones = ({ route ,navigation}: any) => {
  // const zoneData = useSpaceManageContext();
  // console.log(zoneData?.zones)
  // const routeData = route.params;
  // alert(JSON.stringify(routeData));
  const zoneData = ["A", "B", "C"];
  const ZoneView = ({zone}: any) => (
    <TouchableOpacity
      style={{ padding: 25, margin: 25, backgroundColor: "white" }}
      onPress={() => {navigation.navigate('Blocks',zone)}}
    >
      <Text style={{ color: "black" }}>{zone}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.background_main}>
      <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Your Zones</Text>
      <FlatList
        numColumns={2}
        data={zoneData}
        renderItem={(val) => <ZoneView zone={val.item}></ZoneView>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default Zones;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#0A0D30",
    paddingBottom: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
