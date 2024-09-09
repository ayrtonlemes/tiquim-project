import React from "react";
import { Box } from "@mui/material";

interface LogoTiquimProps {
  width?: number;
  height?: number;
  sx?: object;
}

const LogoTiquim = ({ width = 30, height = 35, sx }: LogoTiquimProps) => {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      fill="none"
      stroke="black"
      strokeWidth="6"
      sx={sx}
    >
      <path d="M50 1C50 1 87 32 87 67C87 86 69 99 50 99C31 99 13 86 13 67C13 32 50 1 50 1Z" />
      <path d="M50 1L50 99" />
      <path d="M50 60L79 40" />
      <path d="M50 60L20 40" />
      <path d="M50 60L85 80" />
      <path d="M50 60L15 80" />
    </Box>
  );
};

export default LogoTiquim;
