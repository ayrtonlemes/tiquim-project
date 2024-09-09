import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { PostHeader } from "./PostHeader";
import { Post } from "@/app/types/post";
import { useRemovePost } from "@/app/hooks/useRemovePost";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useState } from "react";
import AlertDialog from "../DialogConfirmationDelete";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
}

export function PostCard({ post, isOwner }: PostCardProps) {
  const { mutate } = useRemovePost();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReportBtn = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    handleMenuClose();
    setConfirmOpen(false);
  };

  const handleRemoveBtn = () => {
    mutate(post.id);
    handleMenuClose();
    handleConfirmClose();
  };

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, margin: "16px auto", boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", wordBreak: "break-word" }}
          >
            {post.title}
          </Typography>
        }
        subheader={<PostHeader user={""} createdAt={post.createdAt} />}
        action={
          isOwner ? (
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <></>
          )
        }
      />
      <CardContent
        sx={{
          pt: 0,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            wordBreak: "break-word",
          }}
        >
          {post.description}
        </Typography>
      </CardContent>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleReportBtn} sx={{ paddingX: 1 }}>
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          <Typography sx={{ color: "red" }}>Remover</Typography>
        </MenuItem>
      </Menu>
      <AlertDialog
        open={confirmOpen}
        onConfirm={handleRemoveBtn}
        onCancel={handleConfirmClose}
        message={"Tem certeza que deseja apagar essa atualização?"}
        title="Remoção de Atualização"
      />
    </Card>
  );
}
