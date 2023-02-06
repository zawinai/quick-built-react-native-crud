import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Tnote } from "../types/types";

export function useStorage<T extends []>(key: string, initialValue: T) {
  const [note, setNote] = useState<Tnote[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await AsyncStorage.getItem(key);

        if (res !== null) {
          const json = await JSON.parse(res);
          console.log(json);
          setNote(json);
        } else {
          setNote(initialValue);
        }
      } catch (error) {
        setError("An Error Occured");
      }
      setLoading(false);
    };

    getData();
  }, []);

  const handleAddNote = async (val: string) => {
    try {
      const noteToAdd = { id: uuid.v4(), name: val };
      if (note.length < 1)
        await AsyncStorage.setItem(key, JSON.stringify([noteToAdd]));
      await AsyncStorage.setItem(key, JSON.stringify([...note, noteToAdd]));
      setNote([...note, noteToAdd].reverse());
    } catch (errr) {
      setError("An error occured while adding note");
    }
  };

  const handleEdit = async (id: string, val: string) => {
    if (val.length <= 1) {
      return;
    } else {
      const findNote = note.map((n: Tnote) =>
        n.id === id ? { ...n, name: val } : n
      );

      await AsyncStorage.setItem("note", JSON.stringify(findNote));
      setNote(findNote);
    }
  };

  const handleDelete = async (id: string) => {
    const filterNote = note.filter((n: Tnote) => n.id !== id);

    await AsyncStorage.setItem("note", JSON.stringify(filterNote));
    setNote(filterNote);
  };

  return {
    note,
    setNote,
    handleAddNote,
    handleEdit,
    handleDelete,
    loading,
    error,
  };
}
