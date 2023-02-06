import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";

import { useApp } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { handleAddNote, setNote } = useApp();

  const [val, setVal] = useState("");

  const deleteItem = async () => {
    await AsyncStorage.removeItem("note");
  };

  return (
    <View className='flex flex-row items-center justify-between w-[90%] mt-10 rounded-md px-5'>
      <View className='w-full'>
        <TextInput
          multiline={false}
          placeholder='New todo'
          className='bg-sky-400 px-3 py-2 rounded-2xl my-4 text-white w-full'
          value={val}
          onChangeText={(text) => setVal(text)}
        />

        <View className='flex flex-row items-center justify-between w-full'>
          <Button
            icon='delete'
            className='bg-red-700'
            mode='contained'
            onPress={() => {
              deleteItem();
              setNote([]);
            }}
          >
            Delete
          </Button>
          <Button
            icon='pen'
            className='bg-sky-400'
            mode='contained'
            onPress={() => {
              // deleteItem();
              handleAddNote(val);
              setVal("");
            }}
          >
            Add
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Header;
