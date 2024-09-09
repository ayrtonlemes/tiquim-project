import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface InputFileUploadProps {
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ fileName, onFileChange }: InputFileUploadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        height: "50px",
        width: "200px",
        ml: "10px",
        background: "#32a852",
        textTransform: "none",
        color: "white",
        "&:hover": { backgroundColor: "#008000" },
      }}
    >
      Upload de Imagem
      <VisuallyHiddenInput type="file" name={fileName} onChange={onFileChange} />
    </Button>
  );
}
