import React, { useState } from "react";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface UploadableAvatarProps {
  avatarUrl: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UploadableAvatar({ avatarUrl, onFileChange }: UploadableAvatarProps) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: 150,
        height: 150,
        mx: "auto",
        mb: 2,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar
        alt="User Avatar"
        src={avatarUrl}
        sx={{ width: "100%", height: "100%", mx: "auto", mb: 1 }}
      />
      <>
        <Tooltip title="Upload Avatar">
          <IconButton
            sx={{
              position: "absolute",

              bottom: 3,
              right: 1,

              backgroundColor: "rgba(50, 168, 82 , 0.95)", // 32a852 = rgb(50, 168, 82)
              "&:hover": {
                backgroundColor: "rgba(50, 168, 82, 1)",
              },
              boxShadow: 3,
            }}
            aria-label="Editar Imagem"
            component="label"
          >
            <EditIcon sx={{ color: "rgba(255, 255, 255, 1)" }} />
            <input type="file" accept="image/*" hidden onChange={onFileChange} />
          </IconButton>
        </Tooltip>
      </>
    </Box>
  );
}
