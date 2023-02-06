import React, { Dispatch, createContext, useContext } from "react";
import { initialT } from "./types/types";
import { useStorage } from "./hooks/useStorage";

export const AppContext = createContext<initialT>({
  note: [],
  setNote: () => {},
  handleAddNote: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  loading: true,
  error: null,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    note,
    setNote,
    handleAddNote,
    handleEdit,
    handleDelete,
    loading,
    error,
  } = useStorage("note", []);

  return (
    <AppContext.Provider
      value={{
        note,
        setNote,
        handleAddNote,
        handleEdit,
        handleDelete,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
