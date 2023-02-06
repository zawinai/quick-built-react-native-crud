import React, { Dispatch, createContext, useState, useContext } from "react";
import { useStorage } from "./hooks/useStorage";
// Plese forgive me I use "any" types I am just rushing to finish building this app in a very short time! I will fix this very soon
export const AppContext = createContext<{
  note: { id: string; name: string }[] | [];
  setNote: any;
  handleAddNote: any;
  handleEdit: any;
  handleDelete: any;
  loading: boolean;
}>({
  note: [],
  setNote: () => {},
  handleAddNote: () => {},
  handleDelete: () => {},
  handleEdit: (note: any[], id: string, name: string) => {},
  loading: true,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { note, setNote, handleAddNote, handleEdit, handleDelete, loading } =
    useStorage<string>("note", []);

  return (
    <AppContext.Provider
      value={{
        note,
        setNote,
        handleAddNote,
        handleEdit,
        handleDelete,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
