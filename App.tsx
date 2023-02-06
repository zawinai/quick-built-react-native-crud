/// <reference types="nativewind/types" />
import { StatusBar } from "expo-status-bar";
import Header from "./components/header";
import Content from "./components/content";
import { View, Image, TextInput } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Text, Button, Card } from "react-native-paper";
import { AppContextProvider } from "./context";
import { useApp } from "./context";

export default function App() {
  const { note, setNote } = useApp();

  return (
    <AppContextProvider>
      <PaperProvider>
        <StatusBar style='light' />
        <View className='flex-1 items-center min-h-screen bg-black'>
          <Header />
          <Content />
        </View>
      </PaperProvider>
    </AppContextProvider>
  );
}
