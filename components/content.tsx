import { useState, useRef } from "react";
import { View, ScrollView, TextInput, TextInputProps } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";

import { useApp } from "../context";

const Content = () => {
  const { note, loading, handleEdit, handleDelete } = useApp();
  const editRef = useRef<TextInput | null>(null);

  const TodoCard = ({
    note,
    text,
    id,
  }: {
    note: any;
    text: string;
    id: string;
  }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editVal, setEditVal] = useState<any>({});

    const handleEditBtn = (note: any, id: string, editVal: string) => {
      editRef.current?.focus();
      setEdit(true);
    };

    if (loading) {
      return (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-5xl text-white'>Loading...</Text>
        </View>
      );
    } else {
      return (
        <Card className='mb-4'>
          <Card.Content>
            <TextInput
              ref={editRef || null}
              editable={edit}
              defaultValue={text}
              value={editVal}
              className='text-black text-2xl'
              onChangeText={(text) => setEditVal(text)}
            />
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleEditBtn(note, id, editVal)}>
              Edit
            </Button>
            <Button
              className={`${edit ? "block" : "hidden"}`}
              icon='application-edit'
              onPress={() => handleEdit(note, id, editVal)}
            >
              Edit
            </Button>
            <Button icon='delete' onPress={() => handleDelete(note, id)}>
              Delete
            </Button>
          </Card.Actions>
        </Card>
      );
    }
  };

  return (
    <ScrollView className='flex-1 w-full mt-10'>
      {note.length <= 1 ? (
        <View className='flex-1 items-center justify-center '>
          <Text className='text-white  text-3xl'>No Notes!</Text>
        </View>
      ) : (
        note.map(({ id, name }) => (
          <View key={id}>
            <TodoCard text={name} id={id} note={note} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Content;
