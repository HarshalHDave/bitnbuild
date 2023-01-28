import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import SafeArea from "../components/SafeArea";

export default function ScannerScreen({navigation}:any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    const routeData :any = {};
    var foo = data.split(',');
    routeData['product'] =foo[0];
    routeData['value'] =foo[1];
    routeData['expiry'] =foo[2];
    routeData['desc'] =foo[3];
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("ImportForm",routeData);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeArea>
      <>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
