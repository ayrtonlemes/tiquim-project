"use client";

import { AlertColor } from "@mui/material";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ISnackbar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  severity: AlertColor;
  setSeverity: Dispatch<SetStateAction<AlertColor>>;
  setSnackbar: (message: string, severity?: AlertColor, duration?: number) => void;
}

interface SnackbarProps {
  children: ReactNode;
}

export const SnackbarContext = createContext<ISnackbar>({
  open: false,
  setOpen: () => {},
  message: "",
  setMessage: () => {},
  duration: 2000,
  setDuration: () => {},
  severity: "success",
  setSeverity: () => {},
  setSnackbar: () => {},
});

const SnackbarProvider: React.FC<SnackbarProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const setSnackbar = (
    message: string,
    severity: AlertColor = "success",
    duration: number = 8000,
  ) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        open,
        setOpen,
        message,
        setMessage,
        duration,
        setDuration,
        severity,
        setSeverity,
        setSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
