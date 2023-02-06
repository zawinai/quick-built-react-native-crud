/// <reference types="nativewind/types" />
// uils
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

// hooks
import { AppContextProvider } from "./context";
// coponents
import Header from "./components/header";
import Content from "./components/content";

export default function App() {
  return (
    <AppContextProvider>
      <PaperProvider>
        <StatusBar style='light' />
        <View className='flex-1 items-center bg-black'>
          <Header />
          <Content />
        </View>
      </PaperProvider>
    </AppContextProvider>
  );
}
