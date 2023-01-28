import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const ImportForm = ({ navigation, route }: any) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [ShowDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<any>();
  const [routeParams, setrouteParams] = useState(route.params);
  useEffect(() => {
    setrouteParams(route.params);
  }, [route.params]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeArea>
      <>
        <Navbar
          title="Import Goods"
          iconComponent={
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              onPress={() => navigation.navigate("ScannerScreen")}
              color="#aea0ae"
            />
          }
        />
        <Formik
          initialValues={{
            name: routeParams?.product ? routeParams.product : "",
            value: routeParams?.value ? routeParams.value : "",
            expiry: routeParams?.expiry ? routeParams.expiry : "",
          }}
          onSubmit={(values) => alert(JSON.stringify(values))}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 20,
                }}
              >
                Product Details : 
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Product Name"}
                    value={routeParams?.product}
                    onChangeText={(val)=>{
                      setrouteParams({...routeParams, product: val})
                      handleChange("name")(val);
                    }}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Product Value (Rs)"}
                    value={routeParams?.value}
                    onChangeText={(val)=>{
                      setrouteParams({...routeParams, value: val})
                      handleChange("value")(val);
                    }}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={[styles.input, { width: "75%" }]}
                    placeholder={"Expiry Date"}
                    value={routeParams?.expiry}
                    editable={false}
                    placeholderTextColor={"grey"}
                  />
                  <TouchableOpacity
                  style={{backgroundColor:'white',padding:10 ,borderRadius:15}}
                    onPress={() => {setShowDatePicker(true)}}
                  >
                    <Text>Set Date</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 5,
                  marginTop: 15,
                }}
              >
                Product Image :
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 35,
                }}
              >
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
              </View>
              {ShowDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={new Date()}
                  onChange={(change , date) => {
                    if (change.type === "set") {
                      setrouteParams({...routeParams,expiry:date?.toLocaleDateString()})
                      handleChange('expiry')(date?.toLocaleDateString());
                    } 
                    setShowDatePicker(false);
                  }}
                />
              )}
              <Button title="Submit Form" onPress={() => handleSubmit()} />
            </>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default ImportForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
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
