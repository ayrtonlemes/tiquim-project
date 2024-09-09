"use client";
import React from "react";
import { PostCard } from "./PostCard";
import { Container, Typography } from "@mui/material";
import { CreatePost } from "./CreatePost";
import { sortByDateDesc } from "@/app/utils/sort";
import useAuthContext from "@/app/hooks/useAuthContext";
import { usePosts } from "@/app/hooks/usePosts";

interface TabPanelProps {
  idCampaign: string;
  idOwner: string;
  index: number;
  value: number;
}

export function PostsTabPanel({ idCampaign, idOwner, value, index }: TabPanelProps) {
  const { posts } = usePosts(idCampaign);

  const sortedPosts = sortByDateDesc(posts ?? []);

  const { id } = useAuthContext();

  const isOwner = id === idOwner;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <Container
          component="main"
          sx={{
            width: "100%",
            height: "auto",
            minHeight: "487px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 3,
          }}
        >
          {isOwner ? <CreatePost idCampaign={idCampaign} /> : <></>}
          {sortedPosts.length > 0 ? (
            sortedPosts?.map((post) => <PostCard post={post} isOwner={isOwner} />)
          ) : (
            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
              A campanha não possui nenhuma atualização por enquanto
            </Typography>
          )}
        </Container>
      )}
    </div>
  );
}
