"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grouped from "../CategoriesInput";
import FormattedInputs from "../NumberFormat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Campaign, CreateCampaignDto } from "../../types/campaign";
import { State } from "../../types/address";
import useSnackbar from "../../hooks/useSnackbar";
import { createCampaign } from "../../services/campaign";
import InputFileUpload from "../FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCities, useStates } from "@/app/hooks/useAddress";

interface CreateCampaignProps {
  open: boolean;
  handleClose: () => void;
}

const initialState: CreateCampaignDto = {
  goal: 0,
  deadline: new Date(),
  title: "",
  description: "",
  preview: "",
  category: "",
  state: "",
  city: "",
  userId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function CreateCampaignModal({ open, handleClose }: CreateCampaignProps) {
  const [campaignInfo, setCampaignInfo] = useState<CreateCampaignDto>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { states } = useStates();
  const [selectedState, setSelectedState] = useState<string>("");

  function sortStatesByName(states: State[]): State[] {
    return states.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const sortedStates = sortStatesByName(states || []);

  const { cities } = useCities(selectedState);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleStateChange = (event: SelectChangeEvent) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setCampaignInfo({ ...campaignInfo, state: newState, city: "" });
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    setCampaignInfo({ ...campaignInfo, city: newCity });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Campaign>();

  const { setSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    const formattedData = {
      ...campaignInfo,
      createdAt: campaignInfo.createdAt,
      updatedAt: campaignInfo.updatedAt,
      deadline: campaignInfo.deadline,
    };

    if (selectedFile) {
      try {
        if (formattedData.title.length > 50) {
          setSnackbar("O título deve ter no máximo 50 caracteres", "error");
          return;
        }

        if (formattedData.preview.length > 120) {
          setSnackbar("O título deve ter no máximo 120 caracteres", "error");
          return;
        }

        if (formattedData.description.length > 1000) {
          setSnackbar("O título deve ter no máximo 1000 caracteres", "error");
          return;
        }

        if (formattedData.deadline < formattedData.createdAt) {
          setSnackbar("O prazo não pode ser anterior à data de criação.", "error");
          return;
        }

        const response = await createCampaign(formattedData, selectedFile);

        if (response.status != 200) {
          setSnackbar("Erro ao criar a campanha", "error");
          throw new Error(`Error on handle submit creating campaign: ${response.statusText}`);
        }

        setSnackbar("Campanha criada com sucesso!");
        setCampaignInfo(initialState);
        setSelectedFile(null);
        setSelectedState("");
        handleClose();
      } catch (error) {
        setSnackbar("Erro na criação da campanha", "error");
      }
    } else {
      setSnackbar("Selecione um arquivo para a campanha", "error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="body" maxWidth="md">
      <DialogContent sx={{ p: 6, backgroundColor: "#f8fafa" }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Criar Campanha
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
          encType="multipart/form-data"
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
                autoComplete="title"
                autoFocus
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 50 }}
                {...register("title", { required: true })}
                value={campaignInfo?.title}
                onChange={(e) => setCampaignInfo({ ...campaignInfo, title: e.target.value })}
              />
              {errors.title?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="goal" sx={{ color: "black" }}>
                Meta
              </InputLabel>
              <FormattedInputs
                campaignInfo={campaignInfo}
                setCampaignInfo={setCampaignInfo}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="category" sx={{ color: "black" }}>
                Categorias
              </InputLabel>
              <Grouped
                campaignInfo={campaignInfo}
                setCampaignInfo={setCampaignInfo}
                register={register}
                handleSubmit={handleSubmit} //n eh necessario
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="deadline" sx={{ color: "black" }}>
                Prazo
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={campaignInfo.deadline}
                  onChange={(date) => setCampaignInfo({ ...campaignInfo, deadline: date! })}
                  slotProps={{ textField: { variant: "outlined" } }}
                  format="dd-MM-yyyy"
                  sx={{ backgroundColor: "white", width: "100%" }}
                />
              </LocalizationProvider>
              {errors.deadline?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="state" sx={{ color: "black" }}>
                Estado
              </InputLabel>
              <Select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              >
                {sortedStates?.map((state) => (
                  <MenuItem key={state.sigla} value={state.sigla}>
                    {state.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="city" sx={{ color: "black" }}>
                Cidade
              </InputLabel>
              <Select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedState}
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              >
                {cities?.map((city) => (
                  <MenuItem key={city.nome} value={city.nome}>
                    {city.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="preview" sx={{ color: "black" }}>
                Resumo
              </InputLabel>
              <TextField
                required
                fullWidth
                id="preview"
                autoComplete="preview"
                autoFocus
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 120 }}
                {...register("preview", { required: true })}
                value={campaignInfo.preview}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCampaignInfo({ ...campaignInfo, preview: e.target.value })
                }
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
                autoComplete="description"
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: "white" }}
                inputProps={{ maxLength: 1000 }}
                {...register("description", { required: true })}
                value={campaignInfo.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCampaignInfo({
                    ...campaignInfo,
                    description: e.target.value,
                  })
                }
              />
              {errors.description?.type === "required" && (
                <Box sx={{ color: "error.main" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                    display: selectedFile ? "block" : "none",
                  }}
                  src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
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
              {selectedFile === null && (
                <Box sx={{ color: "error.main", mt: "8px" }}>Esse campo é obrigatório</Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
