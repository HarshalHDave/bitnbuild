import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContextProvider } from "./src/lib/Context";
import Home from "./src/screens/Home";
import Inventory from "./src/screens/Inventory";
import Inv_anal from "./src/screens/Inv_anal";
import Orders from "./src/screens/Orders";
import Transanctions from "./src/screens/Transanctions";
import Trans_anal from "./src/screens/Trans_anal";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import ImportForm from "./src/screens/ImportForm";
import ScannerScreen from "./src/screens/ScannerScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <ContextProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Transanctions" component={Transanctions} />
            <Stack.Screen name="Inventory" component={Inventory} />
            <Stack.Screen name="Inv_anal" component={Inv_anal} />
            <Stack.Screen name="Trans_anal" component={Trans_anal} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ImportForm" component={ImportForm} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </PaperProvider>
  );
}
