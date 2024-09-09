import { useContext } from "react";
import { SnackbarContext } from "../states/SnackbarProvider";

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  return context;
};

export default useSnackbar;
