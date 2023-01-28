import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContextProvider } from "./src/lib/Context";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigation from "./src/navigation";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <ContextProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigation/>
        </NavigationContainer>
      </ContextProvider>
    </PaperProvider>
  );
}
