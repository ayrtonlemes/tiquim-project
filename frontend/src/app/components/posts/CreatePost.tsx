import useAuthContext from "@/app/hooks/useAuthContext";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useUser } from "@/app/hooks/useUser";
import { createPost } from "@/app/services/post";
import { getAvatarUser } from "@/app/services/user";
import { CreatePostDTO } from "@/app/types/post";
import { Avatar, Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface CreatePostProps {
  idCampaign: string;
}

export function CreatePost({ idCampaign }: CreatePostProps) {
  const initialState = {
    campaignId: idCampaign,
    title: "",
    description: "",
  };

  const [post, setPost] = useState<CreatePostDTO>(initialState);
  const { id } = useAuthContext();
  const { user } = useUser(id);
  const { setSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleFormSubmit = async () => {
    if (id === "") {
      setSnackbar("Você precisa estar logado para postar", "error");
    } else {
      try {
        if (post.title.length > 100) {
          setSnackbar("O título pode ter no máximo 100 caracteres", "error");
          return;
        }

        if (post.description.length > 500) {
          setSnackbar("O título pode ter no máximo 500 caracteres", "error");
          return;
        }

        if (post.title.length == 0) {
          setSnackbar("Insira um título", "error");
          return;
        }
        if (post.description.length == 0) {
          setSnackbar("Insira uma descrição", "error");
          return;
        }

        const response = await createPost(post);

        setSnackbar("Post criado com sucesso!");
        setPost(initialState);
        queryClient.invalidateQueries({ queryKey: ["posts", idCampaign] });
      } catch (error) {
        setSnackbar("Erro na criação do post", "error");
        console.log(error);
      }
    }
  };

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, margin: "16px auto", boxShadow: 3 }}>
      <CardHeader
        title={"Crie uma postagem para atualizar seus apoiadores"}
        titleTypographyProps={{ fontWeight: "bold" }}
      />
      <CardContent
        component="form"
        onSubmit={() => {}}
        sx={{
          py: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <TextField
          required
          fullWidth
          id="title"
          autoComplete="title"
          autoFocus
          variant="outlined"
          multiline
          sx={{
            backgroundColor: "transparent",
            mt: 1,
          }}
          inputProps={{
            maxLength: 100,
            disableUnderline: true,
            style: { fontSize: "13px" },
          }}
          placeholder="Título..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <TextField
          required
          fullWidth
          id="description"
          autoComplete="description"
          autoFocus
          variant="outlined"
          multiline
          sx={{
            backgroundColor: "transparent",
            mt: 3,
          }}
          inputProps={{
            maxLength: 500,
            disableUnderline: true,
            style: { fontSize: "13px" },
          }}
          placeholder="Descrição..."
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#32a852",
            color: "white",
            "&:hover": { backgroundColor: "#008000" },
            mt: 3,
          }}
          onClick={handleFormSubmit}
        >
          Postar
        </Button>
      </CardContent>
    </Card>
  );
}
