// uils
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
// hooks
import { useApp } from "../context";

import { TodoCard } from "./card";

const Content = () => {
  const { note, loading } = useApp();

  if (loading)
    return (
      <Spinner
        visible={loading}
        textContent={"Loading notes..."}
        textStyle={{ color: "white" }}
      />
    );

  return (
    <ScrollView className='flex-1 w-full mt-10'>
      {note.length < 1 ? (
        <View className='flex-1 items-center justify-center '>
          <Text className='text-white  text-3xl'>No Notes!</Text>
        </View>
      ) : (
        <View className='max-w-[900px] bg-blue-200 px-1 py-3 rounded-md mx-auto w-full flex flex-col items-center'>
          {note.map(({ id, name }) => (
            <View key={id as string} className='px-3 w-full'>
              <TodoCard text={name} id={id as string} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Content;
