"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

type selectedDialogContextType = {
  selectedDialog?: string;
  setCurrentSelectedDialog: (selected: string) => void;
};

const selectedDialogContextDefaultValues: selectedDialogContextType = {
  selectedDialog: "",
  setCurrentSelectedDialog: () => {},
};

const SelectedDialogContext = createContext<selectedDialogContextType>(
  selectedDialogContextDefaultValues,
);

export const SelectedDialogProvider = ({ children }: PropsWithChildren) => {
  const [selectedDialog, setSelectedDialog] = useState<string>();
  const setCurrentSelectedDialog = (selectedDialog: string) => {
    setSelectedDialog(selectedDialog);
  };
  const value = {
    selectedDialog,
    setCurrentSelectedDialog,
  };
  return (
    <SelectedDialogContext.Provider value={value}>
      {children}
    </SelectedDialogContext.Provider>
  );
};

export const useSelectedDialogContext = () => useContext(SelectedDialogContext);
