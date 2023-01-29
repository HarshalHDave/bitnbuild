import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Formik } from "formik";
import { useAppContext } from "../lib/Context";
import Checkbox from "expo-checkbox";
import axios from "axios";

const EmployeeManage = () => {
  const auth = useAppContext();
  const [isChecked, setChecked] = useState({
    trans: false,
    invManage: false,
    thirdParty: false,
    spaceManage: false,
    employee: false,
    ai: false,
  });
  return (
    <SafeArea>
      <>
        <Navbar title="Employee Page" />
        <Formik
          initialValues={{
            id: "",
            pass: "",
          }}
          onSubmit={(values) => {
            var trueArr = [];
            if (isChecked.ai) trueArr.push("ai");
            if (isChecked.trans) trueArr.push("trans");
            if (isChecked.spaceManage) trueArr.push("spaceManage");
            if (isChecked.invManage) trueArr.push("invManage");
            if (isChecked.employee) trueArr.push("employee");
            if (isChecked.thirdParty) trueArr.push("thirdParty");
            auth?.signUpEmployee(values.id,values.pass,JSON.stringify(trueArr));
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Employee ID"}
                    value={values.id}
                    onChangeText={handleChange("id")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Their Password"}
                    value={values.pass}
                    onChangeText={handleChange("pass")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.trans}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, trans: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>Transanctions</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.invManage}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, invManage: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>inventory management</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.thirdParty}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, thirdParty: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>3rd Party API</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.ai}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, ai: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>AI Forecast</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.spaceManage}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, spaceManage: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>Space management</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked.employee}
                    onValueChange={(val) => {
                      setChecked({ ...isChecked, employee: val });
                    }}
                    color={isChecked ? "blue" : undefined}
                  />
                  <Text style={styles.paragraph}>Employee Management</Text>
                </View>
              </View>
              <Button title="Submit" onPress={() => handleSubmit()} />
            </>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default EmployeeManage;

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

  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "white",
  },
  checkbox: {
    margin: 8,
  },
});
