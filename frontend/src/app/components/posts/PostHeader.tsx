import { formatDatetime } from "@/app/utils/datetime";
import { Box, Typography } from "@mui/material";

interface PostHeaderProps {
  user: string;
  createdAt: Date;
}

export function PostHeader({ user, createdAt }: PostHeaderProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>{user}</Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "text.secondary",
        }}
      >
        {formatDatetime(createdAt)}
      </Typography>
    </Box>
  );
}
