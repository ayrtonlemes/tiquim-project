"use client";

import React from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

export default function CustomSnackbar() {
  const { open, setOpen, message, severity, duration } = useSnackbar();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      autoHideDuration={duration}
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
