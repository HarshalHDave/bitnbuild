import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import { Ionicons } from "@expo/vector-icons";

const dataImport = [
  {
    data: [760, 860, 960, 60, 260, 360],
  },
];
const dataExport = [
  {
    data: [60, 260, 360, 460, 560, 606],
  },
];
const Inv_anal = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [DataSet, setDataSet] = useState(dataImport);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // ...rest of the code remains same

  if (status === null) {
    requestPermission();
  }
  const imageRef = useRef();
  const onSaveImageAsync = async () => {
    imageRef?.current.capture().then((uri: any) => {
      console.log("do something with ", uri);
      Sharing.shareAsync("file://" + uri);
    });
  };
  useEffect(() => {
    if (selectedLanguage === "export") setDataSet(dataExport);
    if (selectedLanguage === "import") setDataSet(dataImport);
  }, [selectedLanguage]);
  return (
    <SafeArea>
      <>
        <Navbar
          title="Inventory Analysis"
          iconComponent={
            <Ionicons
              name="share-social-sharp"
              onPress={onSaveImageAsync}
              size={24}
              color="#dedede"
            />
          }
        />
        <ScrollView>
          <ViewShot ref={imageRef} options={{ format: "jpg", quality: 0.9 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 12,
              }}
            >
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#cec0ce",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 24,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "#0A0D30",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  900
                </Text>
                <Text
                  style={{ fontSize: 16, color: "#0A0D30", fontWeight: "400" }}
                >
                  Products in Inventory
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#cec0ce",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 24,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "#0A0D30",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  ₹1M
                </Text>
                <Text
                  style={{ fontSize: 16, color: "#0A0D30", fontWeight: "400" }}
                >
                  Net Value of Inventory
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 12,
              }}
            >
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#cec0ce",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 24,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "#0A0D30",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  19
                </Text>
                <Text
                  style={{ fontSize: 16, color: "#0A0D30", fontWeight: "400" }}
                >
                  Products added today
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#cec0ce",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 24,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "#0A0D30",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  14
                </Text>
                <Text
                  style={{ fontSize: 16, color: "#0A0D30", fontWeight: "400" }}
                >
                  Outbounded products
                </Text>
              </View>
            </View>
            <Picker
              selectedValue={selectedLanguage}
              dropdownIconColor="#fff"
              style={{
                backgroundColor: "transparent",
                width: "100%",
                alignSelf: "center",
                marginTop: 15,
                color: "#fff",
                borderBottomColor: "#fff",
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="Number of Products" value="import" />
              <Picker.Item label="Value of Inventory" value="export" />
            </Picker>
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: DataSet,
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={{
                marginVertical: 8,
              }}
            />
          </ViewShot>
        </ScrollView>
      </>
    </SafeArea>
  );
};

export default Inv_anal;

const styles = StyleSheet.create({});
