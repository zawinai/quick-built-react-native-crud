// utils
import { TextInput } from "react-native";
import { Card, Button } from "react-native-paper";
// hooks
import { useState, useRef } from "react";
import { useApp } from "../context";
//types
import { Tnote } from "../types/types";

export const TodoCard = ({ text, id }: { text: string; id: string }) => {
  const { handleEdit, handleDelete } = useApp();

  const [edit, setEdit] = useState<boolean>(false);
  const [editVal, setEditVal] = useState<any>({});

  const editRef = useRef<TextInput | null>(null);

  return (
    <Card className='mb-4'>
      <Card.Content className='my-2'>
        <TextInput
          ref={editRef}
          editable={edit}
          defaultValue={text}
          value={editVal}
          className='text-black text-2xl focus:border-2 focus:bg-slate-200 focus:border-orange-500 min-h-[50px] rounded-md pl-3'
          onChangeText={(text) => {
            editRef.current?.focus();
            setEditVal(text);
          }}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => setEdit(true)}
          className={`${edit ? "hidden" : ""}`}
        >
          Edit
        </Button>
        <Button
          disabled={editVal.length <= 1}
          className={`${edit ? "block" : "hidden"}`}
          icon='checkbox-marked'
          onPress={() => handleEdit(id, editVal)}
        >
          Ok
        </Button>
        <Button
          icon='delete'
          onPress={() => handleDelete(id)}
          className='bg-red-400'
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};
