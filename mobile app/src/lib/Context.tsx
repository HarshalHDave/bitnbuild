import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";
interface Authcon {
  user: user;
  signIn: (uname: string, pass: string) => void;
  signOut: () => void;
}
interface user {
  uname: string;
  email: string;
  mobileNumber :string;
  token: string;
  zip?:string
  city:string;
  address:string;
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
          console.log(val.data.data)
          setUser({
            email: val.data.data.email,
            token: val.data.data.token,
            uname: val.data.data.name ?  val.data.data.name : 'barfi',
            mobileNumber: val.data.data.mobileNo,
            city: val.data.data.city,
            address: val.data.data.address,
          });
        }
      });
  };
  const signOut = async() => {
    await AsyncStorage.removeItem("userCred");
    setUser(null)
  };
  useEffect(() => {}, []);
  return {
    user,
    signIn,
    signOut
  };
}
