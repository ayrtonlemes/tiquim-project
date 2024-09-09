"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Campaign } from "../types/campaign";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";
import { deleteCampaign, getImageCampaign } from "../services/campaign";
import { useCampaignPercentage } from "../hooks/useCampaignPercentage";
import { CardHeader } from "./CardHeader";
import { useQueryClient } from "@tanstack/react-query";
import AlertDialog from "./DialogConfirmationDelete";
import { formatDate } from "../utils/datetime";
import Link from "next/link";

interface CampaignCardProps {
  campaign: Campaign;
  handleOpen: (campaign: Campaign) => void;
}

export function YourCampaignCard({ campaign, handleOpen }: CampaignCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const datetime: string = formatDate(campaign.createdAt);

  const { setSnackbar } = useSnackbar();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string>("null");

  const [imageUrl, setImageUrl] = useState<string>("/placeholder.png");

  useEffect(() => {
    const fetchImage = async () => {
      if (campaign?.imageUrl && campaign.imageUrl.length > 0) {
        const image = await getImageCampaign(campaign.imageUrl);
        setImageUrl(image);
      }
    };
    fetchImage();
  }, [campaign]);

  const { user, isPending: userPending, isError: userError } = useUser(campaign.userId);
  const {
    percentage,
    isPending: percentagePending,
    isError: percentageError,
  } = useCampaignPercentage(campaign.id);

  if (userPending || percentagePending) {
    return <div>Loading...</div>;
  }

  if (userError || percentageError) {
    return <div>Error loading data</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  let completedPercentage = 0;
  if (percentage) {
    const percentageValue = typeof percentage === "number" ? percentage : Number(percentage);
    completedPercentage = Math.min(percentageValue * 100, 100);
  }

  const openCampaignDetails = (idCampaign: string) => {
    router.push(`/your-campaign/${idCampaign}`);
  };

  const handleEdit = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    handleOpen(campaign);
  };

  const handleConfirmOpen = (idCampaign: string) => {
    setCampaignToDelete(idCampaign);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setCampaignToDelete("null");
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    if (Number(percentage) > 0) {
      setConfirmOpen(false);
      setSnackbar(
        "Não é possível apagar uma campanha que já recebeu doações. Entre em contato com o suporte para fechar a campanha",
        "error",
      );
      return;
    }

    if (!campaignToDelete) return;
    try {
      const success = await deleteCampaign(campaignToDelete);

      if (success) {
        setSnackbar("Campanha deletada com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
      }

      setConfirmOpen(false);
    } catch (err) {
      setSnackbar(
        "Erro ao deletar campanha. Se houver atualizações na campanha, apague-as e tente de novo",
        "error",
      );
    }
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: { xs: "auto", sm: 0 },
        cursor: "pointer",
      }}
      onClick={() => openCampaignDetails(campaign.id)}
    >
      <Link href={`your-campaign/${campaign.id}`} legacyBehavior>
        <a style={{ textDecoration: "none", color: "inherit" }}>
          <CardMedia component="img" alt={campaign.title} height="140" image={imageUrl} />
          <CardContent sx={{ flexGrow: 1, mx: 1.5, overflow: "hidden" }}>
            <CardHeader
              title={campaign.title}
              author={user.name}
              authorId={user.id}
              createdAt={datetime}
              completedPercentage={completedPercentage}
              city={campaign.city}
              state={campaign.state}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px" }}>
              {campaign.preview}
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions sx={{ m: 2, mb: 2, display: "flex", justifyContent: "end" }}>
        <IconButton aria-label="edit" color="success" onClick={handleEdit}>
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            handleConfirmOpen(campaign.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <AlertDialog
        open={confirmOpen}
        onConfirm={handleDelete}
        onCancel={handleConfirmClose}
        message={"Tem certeza que deseja deletar essa campanha?"}
        title="Confirmar exclusão de campanha"
      />
    </Card>
  );
}
