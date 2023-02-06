import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export function useStorage<T>(key: string, initialValue: any) {
  const [note, setNote] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await AsyncStorage.getItem(key);

      if (res !== null) {
        const json = await JSON.parse(res);
        setNote(json.reverse());
      } else {
        setNote(initialValue);
      }
      setLoading(false);
    };

    getData();
  }, []);

  const handleAddNote = async (val: string) => {
    const noteToAdd = { id: uuid.v4(), name: val };
    await AsyncStorage.setItem(key, JSON.stringify([...note, noteToAdd]));
    setNote([...note, noteToAdd].reverse());
  };

  const handleEdit = async (note: any, id: string, val: string) => {
    const findNote = note.map((n: any) =>
      n.id === id ? { ...n, name: val } : n
    );

    await AsyncStorage.setItem("note", JSON.stringify(findNote));
    setNote(findNote);
  };

  const handleDelete = async (note: any, id: string) => {
    const filterNote = note.filter((n: any) => n.id !== id);
    await AsyncStorage.setItem("note", JSON.stringify(filterNote));
    setNote(filterNote);
  };

  return { note, setNote, handleAddNote, handleEdit, handleDelete, loading };
}
