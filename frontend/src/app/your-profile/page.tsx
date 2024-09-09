"use client";

import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getAvatarUser } from "../services/user";
import useAuthContext from "../hooks/useAuthContext";
import { Card, CardContent, CardHeader, Fab, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQueryClient } from "@tanstack/react-query";
import { getImageCampaign } from "../services/campaign";
import { useContributions, useCampaignsByContribution } from "../hooks/useUserContributions";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useUserCampaigns } from "../hooks/useUserCampaigns";
import { useRouter } from "next/navigation";

export default function YourProfile() {
  const { id } = useAuthContext();
  const { campaigns, isPending, isError } = useUserCampaigns(id);
  const { contributions } = useContributions(id);
  const {
    yourContributions,
    isPending: isPendingContribution,
    isError: isErrorContribution,
  } = useCampaignsByContribution(contributions ?? []);
  const { user } = useUser(id);
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.png");
  const [imagesUrl, setImagesUrl] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const fetchAvatarImage = async () => {
      if (user?.avatarUrl && user.avatarUrl.length > 0) {
        const image = await getAvatarUser(user.avatarUrl);
        setAvatarUrl(image);
      }
    };
    fetchAvatarImage();
  }, [user]);

  useEffect(() => {
    const fetchCampaignImages = async () => {
      const campaignImages: { [key: string]: string } = {};

      const allCampaigns = [...(campaigns ?? []), ...(yourContributions ?? [])];

      for (const campaign of allCampaigns) {
        if (campaign.imageUrl) {
          const image = await getImageCampaign(campaign.imageUrl);
          campaignImages[campaign.id] = image;
        }
      }

      setImagesUrl(campaignImages);
    };

    if (campaigns || yourContributions) {
      fetchCampaignImages();
    }
  }, [campaigns, yourContributions]);

  const handleCampaignClick = (campaignLink: string) => {
    router.push(`/campaign/${campaignLink}`);
  };

  const showYourCampaigns = () => {
    if (isPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar suas campanhas.
        </Typography>
      );
    } else if (isErrorContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar suas campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Você ainda não criou nenhuma campanha.
        </Typography>
      );
    } else {
      return campaigns?.map((campaign) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={campaign.id}>
          <Card
            sx={{
              p: 2,
              borderRadius: 2,
              width: { xs: "100%", sm: "200px" },
              height: "auto",
              cursor: "pointer",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  {imagesUrl[campaign.id] ? (
                    <Box
                      component="img"
                      sx={{
                        height: 40,
                        width: 40,
                      }}
                      src={imagesUrl[campaign.id]}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ height: "auto", width: "auto" }} />
                  )}
                </Avatar>
              }
              title={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {campaign.title}
                </Typography>
              }
              titleTypographyProps={{ fontWeight: "bold" }}
              onClick={() => handleCampaignClick(campaign.id)}
            />
          </Card>
        </Grid>
      ));
    }
  };

  const showCampaignsYouHelped = () => {
    if (isPendingContribution) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar suas contribuições.
        </Typography>
      );
    } else if (isError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar suas campanhas.
        </Typography>
      );
    } else if (yourContributions?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Você ainda não ajudou nenhuma campanha.
        </Typography>
      );
    } else {
      return yourContributions?.map((campaign) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={campaign.id}>
          <Card
            sx={{
              p: 2,
              borderRadius: 2,
              width: { xs: "100%", sm: "200px" },
              height: "auto",
              cursor: "pointer",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  {imagesUrl[campaign.id] ? (
                    <Box
                      component="img"
                      sx={{
                        height: 40,
                        width: 40,
                      }}
                      src={imagesUrl[campaign.id]}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ height: "auto", width: "auto" }} />
                  )}
                </Avatar>
              }
              title={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {campaign.title}
                </Typography>
              }
              titleTypographyProps={{ fontWeight: "bold" }}
              onClick={() => handleCampaignClick(campaign.id)}
            />
          </Card>
        </Grid>
      ));
    }
  };

  if (id === "") {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Realize o login para visualizar seu perfil.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 5, mb: 2 }}>
      <Box position="relative" display="inline-block" sx={{ mb: 5 }}>
        <Avatar
          alt={user?.name}
          src={avatarUrl ?? "fallback-avatar-url"}
          sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
        />
        <Fab
          aria-label="edit"
          onClick={() => {}}
          sx={{
            position: "absolute",
            bottom: 3,
            right: 0,
            backgroundColor: "rgba(50, 168, 82 , 0.50)",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "rgba(50, 168, 82, 1)",
            },
          }}
          href="/edit-account"
        >
          <EditIcon sx={{ color: "rgba(255, 255, 255, 1)" }} />
        </Fab>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" mb={10}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {user?.name ?? ""}
        </Typography>
      </Box>

      <Box sx={{ mt: 10, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          Suas Campanhas
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {showYourCampaigns()}
        </Grid>
      </Box>

      <Box sx={{ mt: 5, textAlign: "left" }}>
        <Typography variant="h6" fontSize="25px" fontWeight="bold">
          Campanhas que você apoiou
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {showCampaignsYouHelped()}
        </Grid>
      </Box>
    </Container>
  );
}
