import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../context";

const Header = () => {
  const handleDelete = async () => {
    await AsyncStorage.removeItem("note");
  };

  const { note, setNote, handleAddNote } = useApp();

  const [val, setVal] = useState("");

  return (
    <View className='bg-white flex flex-row items-center justify-between w-[90%] mt-10 rounded-md px-5'>
      <TextInput
        placeholder='New todo'
        className='bg-sky-400 w-[65%] px-3 rounded-2xl h-[70%] my-4'
        value={val}
        onChangeText={(text) => setVal(text)}
      />

      <View>
        <Button
          icon='pen'
          className='bg-sky-400'
          mode='contained'
          onPress={() => handleAddNote(val)}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default Header;
