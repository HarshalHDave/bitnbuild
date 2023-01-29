import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../lib/FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppContext } from "../lib/Context";
import axios from "axios";
import baseUrl from "../lib/baseUrl";

const ImportForm = ({ navigation, route }: any) => {
  const auth = useAppContext();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [ShowDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<string>();
  const [routeParams, setrouteParams] = useState(route.params);
  useEffect(() => {
    setrouteParams(route.params);
  }, [route.params]);

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const fileUrl = uri.split("/");
    const fileName = fileUrl[fileUrl.length - 1];
    const imageBuff = await response.blob();
    // console.log(imageBuff)
    var imageRef = ref(storage, "images/" + fileName);
    const upload = await uploadBytes(imageRef, imageBuff);
    const url = await getDownloadURL(imageRef);
    return url;
  };
  const formSubmit = async (
    name: string,
    value: string,
    imgLink: string,
    expiry: string,
    desc: string
  ) => {
    const date = new Date();
    function randomString(length: number) {
      return Math.round(
        Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
      )
        .toString(36)
        .slice(1);
    }
    function randomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const prodId =randomString(6).toUpperCase()
    console.log({
      prdID: prodId,
      name: name,
      value: parseInt(value),
      img: imgLink,
      description: desc,
      expiryDate: expiry.trim(),
      importDate: date.toISOString(),
      locId: randomNumber(11, 20),
    })
    axios.post(
      baseUrl+"/product/create",
      {
        prdID: prodId,
        name: name,
        value: parseInt(value),
        img: imgLink,
        description: desc,
        expiryDate: expiry,
        importDate: date.toISOString(),
        locId: randomNumber(11, 20),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user.token}`,
        },
      }
    ).then((val)=>{
      if(val.data.status==='SUCCESS'){
        axios.post(
          baseUrl+"/transaction/create",
          {
            prdID: prodId,
            prdName: name,
            prdValue: parseInt(value),
            prdImg: imgLink,
            prdDesc: desc,
            expiryDate: expiry,
            importDate: date.toISOString(),
            status:'Import'
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.user.token}`,
            },
          }
        ).then(val=>{
          if(val.data.status==="SUCCESS"){
            navigation.popToTop();
          }
          else{
            alert('Error in submitting')
          }
        })
      }
    })
  };
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
            description: routeParams?.desc ? routeParams.desc : "",
          }}
          onSubmit={(values) => {
            if (image) {
              uploadImage(image).then((imgLink) => {
                if (imgLink) {
                  formSubmit(
                    routeParams?.product,
                    routeParams?.value,
                    imgLink,
                    routeParams?.expiry,
                    routeParams?.desc
                  );
                }
              });
            }
            // alert(JSON.stringify(values));
          }}
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
                    onChangeText={(val) => {
                      setrouteParams({ ...routeParams, product: val });
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
                    onChangeText={(val) => {
                      setrouteParams({ ...routeParams, value: val });
                      handleChange("value")(val);
                    }}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Product Description"}
                    value={routeParams?.desc}
                    onChangeText={(val) => {
                      setrouteParams({ ...routeParams, desc: val });
                      handleChange("description")(val);
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
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 15,
                    }}
                    onPress={() => {
                      setShowDatePicker(true);
                    }}
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
                  onChange={(change, date) => {
                    if (change.type === "set") {
                      console.log(date?.toISOString());
                      setrouteParams({
                        ...routeParams,
                        expiry: date?.toISOString(),
                      });
                      //@ts-ignore
                      handleChange("expiry")(date?.toISOString());
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
