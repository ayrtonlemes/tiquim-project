"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Campaign, UpdateCampaignDto } from "@/app/types/campaign";
import { getImageCampaign, updateCampaign } from "@/app/services/campaign";
import useSnackbar from "@/app/hooks/useSnackbar";
import InputFileUpload from "../FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

interface EditCampaignProps {
  open: boolean;
  handleClose: () => void;
  campaign: Campaign;
}

const initialState = {
  title: "",
  preview: "",
  description: "",
  imageUrl: "",
};

export default function EditCampaignModal({ campaign, open, handleClose }: EditCampaignProps) {
  const router = useRouter();
  const [campaignInfo, setCampaignInfo] = useState<UpdateCampaignDto>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Campaign>();

  const { setSnackbar } = useSnackbar();

  const [imageUrl, setImageUrl] = useState<string>("/placeholder.png");

  const fetchImage = async () => {
    if (campaign?.imageUrl && campaign.imageUrl.length > 0) {
      const image = await getImageCampaign(campaign.imageUrl);
      setImageUrl(image);
    }
  };

  const fillCampaignInfo = () => {
    if (campaign) {
      setCampaignInfo({
        title: campaign.title,
        preview: campaign.preview,
        description: campaign.description,
        imageUrl: campaign.imageUrl,
      });
      // Update form values
      setValue("title", campaign.title);
      setValue("preview", campaign.preview);
      setValue("description", campaign.description);
      setValue("imageUrl", campaign.description);
      fetchImage();
    }
  };

  useEffect(() => {
    fillCampaignInfo();
  }, [campaign, setValue]);

  const handleFormSubmit = async () => {
    try {
      const response = await updateCampaign(campaign.id, campaignInfo, selectedFile);
      if (response) {
        setSnackbar("Campanha editada com sucesso!");
        setCampaignInfo(initialState);
        setSelectedFile(null);
        handleClose();
        router.push("/your-campaigns");
      }
    } catch (error) {
      setSnackbar("Erro ao editar a campanha", "error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onClose = () => {
    fillCampaignInfo();
    setSelectedFile(null);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="body" maxWidth="md">
      <DialogContent sx={{ p: 6, backgroundColor: "#f8fafa" }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Editar Campanha
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#32a852",
                color: "white",
                "&:hover": { backgroundColor: "#008000" },
              }}
              onClick={handleSubmit(handleFormSubmit)}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="title" sx={{ color: "black" }}>
                Título
              </InputLabel>
              <TextField
                required
                fullWidth
                id="title"
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 50 }}
                {...register("title", { required: true })}
                value={campaignInfo?.title}
                onChange={(e) => {
                  setCampaignInfo({ ...campaignInfo, title: e.target.value });
                  setValue("title", e.target.value);
                }}
              />
              {errors.title?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="preview" sx={{ color: "black" }}>
                Resumo
              </InputLabel>
              <TextField
                required
                fullWidth
                id="preview"
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 120 }}
                {...register("preview", { required: true })}
                value={campaignInfo.preview}
                onChange={(e) => {
                  setCampaignInfo({ ...campaignInfo, preview: e.target.value });
                  setValue("preview", e.target.value);
                }}
              />
              {errors.preview?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="description" sx={{ color: "black" }}>
                Descrição
              </InputLabel>
              <TextField
                required
                fullWidth
                id="description"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 1000 }}
                {...register("description", { required: true })}
                value={campaignInfo.description}
                onChange={(e) => {
                  setCampaignInfo({ ...campaignInfo, description: e.target.value });
                  setValue("description", e.target.value);
                }}
              />
              {errors.description?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    width: 300,
                  }}
                  src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl}
                />
                <InputFileUpload fileName="campaignImage" onFileChange={handleFileChange} />
                <IconButton
                  aria-label="delete"
                  color="success"
                  sx={{
                    display: selectedFile ? "block" : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
