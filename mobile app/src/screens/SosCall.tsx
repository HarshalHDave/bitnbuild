import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import SafeArea from '../components/SafeArea'
import Navbar from "../components/Navbar";

const data = {
  "error": 0,
  "message": "Successfull",
  "policeStation": [
    {
      "id": 1,
      "name": "Bandra Police Station",
      "address": "Hill Road, Bandra (W), Mumbai - 50",
      "phone": [
        "022-26423122", "022-26513716"
      ]
    },
    {
      "id": 2,
      "name": "Bandra Kurla Complex Police Station",
      "address": "Bandra-Kurla Complex Road, Opp. I.C.I.C.I. Bank, Bandra (E), Mumbai.51",
      "phone": [
        "022-26504482", "022-26504481"
      ]
    },
    {
      "id": 3,
      "name": "Kurla Police Station",
      "address": "Kurla Police Station, Sarveshwar Mandir Marg, BKC Kurla (W), Mumbai 400070",
      "phone": [
        "022-26500478"
      ]
    }
  ],
  "fireStation": [
    {
      "id": 1,
      "name": "Fire Station",
      "address": "Junction Off S V Road & K C Marg, Bandra West, Mumbai - 400050 (Near Traffic Police & MTNL,Bandra Reclamation)",
      "phone": [
        "022-26435206"
      ]
    },
    {
      "id": 2,
      "name": "Fire Station (Bandra Kurla Complex)",
      "address": "Bandra Kurla Complex-bandra East, Mumbai - 400051 (Behind Bharat Petroleum Petrol Pump, Opposite Citibank)",
      "phone": [
        "26522426", "101"
      ]
    },
    {
      "id": 3,
      "name": "Shivaji Park Fire Brigade Station",
      "address": "8, PN Kotnis Rd, Mahim West, Mahim, Mumbai, Maharashtra 400016",
      "phone": [
        "022-2445-7203"
      ]
    }
  ],
  "hospital": [
    {
      "id": 1,
      "name": "S L Raheja Hospital - Fortis",
      "address": "Raheja Rugnalaya Marg, Mahim West, Mahim, Mumbai, Maharashtra 400016",
      "phone": [
        "089560-87400"
      ]
    },
    {
      "id": 2,
      "name": "Lilavati Hospital And Research Centre",
      "address": "A-791, A-791, Bandra Reclamation Rd, General Arunkumar Vaidya Nagar, Bandra West, Mumbai, Maharashtra 400050",
      "phone": [
        "086579-07754"
      ]
    },
    {
      "id": 3,
      "name": "Holy Family Multispeciality Hospital Bandra",
      "address": "St Andrews Rd, Bandra West, Mumbai, Maharashtra 400050",
      "phone": [
        "022-6267-0555"
      ]

    }

  ]
}

const SosCall = () => {
  return (
    <SafeArea>
      <>
        <Navbar title="SOS Alert" />
        <ScrollView>
          <View>
            <Text style={{
              color: "#beb0be",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 0.4,
              marginBottom: 8,
            }}>Police Station</Text>

            {
              data.policeStation.map((item) => {
                return (
                  <View>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}>{item.name}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}>{item.address}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 14,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}>
                      {
                        item.phone.map((phn) => phn + " ")
                      }
                    </Text>
                  </View>

                )
              })
            }
          </View>
          <View>
            <Text style={{
              color: "#beb0be",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 0.4,
              marginBottom: 8,
            }}>Fire Station</Text>

            {
              data.fireStation.map((item) => {
                return (
                  <View>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}>{item.name}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}>{item.address}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 14,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}>
                      {
                        item.phone.map((phn) => phn + " ")
                      }

                    </Text>
                  </View>

                )
              })
            }
          </View>
          <View>
            <Text>Hospitals</Text>

            {
              data.hospital.map((item) => {
                return (
                  <View>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}
                    >{item.name}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 2,
                    }}
                    >{item.address}</Text>
                    <Text style={{
                      color: "#beb0be",
                      fontSize: 14,
                      fontWeight: "600",
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}>
                      {
                        item.phone.map((phn) => " " + phn + " ")
                      }

                    </Text>
                  </View>
                )
              })
            }
          </View>



        </ScrollView>

      </>
    </SafeArea>
  )
}

export default SosCall

const styles = StyleSheet.create({})