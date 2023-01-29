import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";
interface Authcon {
  user: user;
  signIn: (uname: string, pass: string) => void;
  signOut: () => void;
  signUpEmployee: (uname: string, pass: string, roles: string) => void;
}
interface user {
  name: string;
  email: string;
  mobileNumber: string;
  token: string;
  zip?: string;
  city: string;
  address: string;
  number:string;
  username:string
}
const appContext = createContext<Authcon | null>(null);

export function ContextProvider({ children }: any) {
  const context = useContextProvided();
  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useAppContext = () => {
  return useContext(appContext);
};
function useContextProvided() {
  useEffect(() => {
    AsyncStorage.getItem("userCred").then((val) => {
      if (val) {
        const userCred = JSON.parse(val);
        signIn(userCred.username, userCred.password);
      }
    });
  }, []);
  const backendUrl = "http://192.168.137.143:5000/";
  const [user, setUser] = useState<user | null>(null);
  const signIn = (uname: string, pass: string) => {
    axios
      .post(backendUrl + "admin/auth/login", {
        username: uname,
        password: pass,
      })
      .then((val) => {
        if (val.data.status === "SUCCESS") {
          AsyncStorage.setItem(
            "userCred",
            JSON.stringify({
              username: uname,
              password: pass,
            })
          );
          console.log(val.data.data);
          setUser({
            email: val.data.data.email,
            token: val.data.data.token,
            name: val.data.data.name ? val.data.data.name : "barfi",
            mobileNumber: val.data.data.mobileNo,
            city: val.data.data.city,
            address: val.data.data.address,
            number: val.data.data.number,
            username: val.data.data.username,
          });
        }
      });
  };
  const signUp = (uname: string, pass: string) => {
    axios
      .post(backendUrl + "admin/user/create", {
        username: uname,
        password: pass,
      })
      .then((val) => {
        if (val.data.status === "SUCCESS") {
          AsyncStorage.setItem(
            "userCred",
            JSON.stringify({
              username: uname,
              password: pass,
            })
          );
          console.log(val.data.data);
          setUser({
            email: val.data.data.email,
            token: val.data.data.token,
            name: val.data.data.name ? val.data.data.name : "barfi",
            mobileNumber: val.data.data.mobileNo,
            city: val.data.data.city,
            address: val.data.data.address,
            number: val.data.data.number,
            username: val.data.data.username,

          });
        }
      });
  };
  const signUpEmployee = async (uname: string, pass: string, userRoles: string) => {
    const res = await axios
      .post(backendUrl + "admin/user/create", {
        username: uname,
        password: pass,
        userType: 2,
        number: userRoles,
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      return res.data.status === "SUCCESS"
  };
  const signOut = async () => {
    await AsyncStorage.removeItem("userCred");
    setUser(null);
  };
  useEffect(() => {}, []);
  return {
    user,
    signIn,
    signOut,
    signUp,
    signUpEmployee,
  };
}
