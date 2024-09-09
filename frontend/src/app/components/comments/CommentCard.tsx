import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CommentHeader } from "./CommentHeader";
import { useUser } from "@/app/hooks/useUser";
import { Comment } from "@/app/types/comment";
import { useEffect, useState } from "react";
import { getAvatarUser } from "@/app/services/user";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createReportComment } from "@/app/services/report";
import ReportIcon from "@mui/icons-material/Report";
import AlertDialog from "../DialogConfirmationDelete";
import useSnackbar from "../../hooks/useSnackbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CommentCardProps {
  comment: Comment;
  id: string;
}

export function CommentCard({ comment, id }: CommentCardProps) {
  const router = useRouter();
  const { user } = useUser(comment.userId);
  const [avatar, setAvatar] = useState<string>("/placeholder.png");

  const { setSnackbar } = useSnackbar();

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

  const handleReport = async () => {
    try {
      await createReportComment(comment.id);
      setSnackbar("Denúncia feita");
    } catch (error: any) {
      if (error.message === "Request failed with status code 400") {
        setSnackbar("Você já denunciou esta campanha anteriormente", "error");
      } else {
        setSnackbar("Ocorreu um erro. Tente novamente mais tarde", "error");
      }
    } finally {
      handleMenuClose();
      handleConfirmClose();
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (user?.avatarUrl && user?.avatarUrl.length > 0) {
        const image = await getAvatarUser(user?.avatarUrl);
        setAvatar(image);
      }
    };
    fetchImage();
  }, [user?.avatarUrl]);

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, margin: "5px auto", boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Link href={`/profile/${user?.id}`} legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Avatar
                sx={{ bgcolor: "black", cursor: "pointer" }}
                aria-label="recipe"
                onClick={() => {
                  router.push(`/profile/${comment.userId}`);
                }}
              >
                {avatar ? (
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    src={avatar}
                  />
                ) : (
                  <AccountCircleIcon sx={{ height: "auto", width: "auto" }} />
                )}
              </Avatar>
            </a>
          </Link>
        }
        action={
          id && (
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={<CommentHeader user={user?.name ?? ""} createdAt={comment.createdAt} />}
      />
      <CardContent
        sx={{
          pt: 0,
        }}
      >
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            wordBreak: "break-word",
          }}
        >
          {comment.text}
        </Typography>
      </CardContent>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleReportBtn} sx={{ paddingX: 1 }}>
          <ReportIcon sx={{ mr: 1, color: "red" }} />
          <Typography sx={{ color: "red" }}>Denunciar</Typography>
        </MenuItem>
      </Menu>
      <AlertDialog
        open={confirmOpen}
        onConfirm={handleReport}
        onCancel={handleConfirmClose}
        message={"Tem certeza que deseja denunciar esse comentário?"}
        title="Denúncia de Comentário"
      />
    </Card>
  );
}
