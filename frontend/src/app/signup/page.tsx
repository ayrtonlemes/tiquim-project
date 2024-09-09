"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Copyright } from "../components/Copyright";
import { useRouter } from "next/navigation";
import useSnackbar from "../hooks/useSnackbar";
import { signup } from "../services/user";
import { useCities, useStates } from "../hooks/useAddress";
import InputFileUpload from "../components/FileUpload";
import { State } from "../types/address";
import { useCheckAvailableEmail } from "../hooks/useUser";
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";

export default function SignUp() {
  const router = useRouter();
  const { setSnackbar } = useSnackbar();
  const isLoggedIn = useRedirectIfLoggedIn();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { states } = useStates();
  const [selectedState, setSelectedState] = React.useState<string>("");

  function sortStatesByName(states: State[]): State[] {
    return states.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const sortedStates = sortStatesByName(states || []);

  const { cities } = useCities(selectedState);
  const [selectedCity, setSelectedCity] = React.useState<string>("");

  const handleStateChange = (event: SelectChangeEvent) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity("");
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const [emailToCheck, setEmailToCheck] = React.useState<string>("");

  const { check: isEmailAvailable } = useCheckAvailableEmail(emailToCheck);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToCheck(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get("password")?.toString() ?? "";
    const confirmPassword = data.get("confirmPassword")?.toString() ?? "";
    const city = selectedCity;
    const state = selectedState;

    if (password !== confirmPassword) {
      setSnackbar("As senhas não coincidem", "error");
      return;
    }

    if (password.length < 6) {
      setSnackbar("A senha deve ter no mínimo 6 caracteres", "error");
      return;
    }

    if (password.length > 16) {
      setSnackbar("A senha deve ter no máximo 16 caracteres", "error");
      return;
    }

    if (!selectedFile) {
      setSnackbar("Selecione um arquivo para a foto de perfil", "error");
      return;
    }

    if (!state) {
      setSnackbar("Insira um estado", "error");
      return;
    }

    if (!city) {
      setSnackbar("Insira uma cidade", "error");
      return;
    }

    if (!isEmailAvailable) {
      setSnackbar("Email já cadastrado", "error");
      return;
    }

    const user = {
      name: data.get("name")?.toString() ?? "",
      email: emailToCheck,
      password: password,
      avatarUrl: selectedFile.name,
      city: city,
      state: state,
    };

    try {
      const response = await signup(user, selectedFile);

      if (!response) {
        setSnackbar("Erro ao efetuar o cadastro", "error");
        throw new Error("Error on Sign up a new user");
      }

      setSnackbar("Conta criada com sucesso");

      router.push("/login");
    } catch (err) {
      setSnackbar("Erro ao efetuar o cadastro", "error");
      console.log(err);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mb: 5 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nome Completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={handleEmailChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="state">Estado</InputLabel>
              <Select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                label="Estado"
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
              <InputLabel htmlFor="city">Cidade</InputLabel>
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
                <InputFileUpload fileName="avatarImage" onFileChange={handleFileChange} />
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Eu quero receber inspiração, promoções de marketing e atualizações por e-mail."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#32a852",
              "&:hover": { backgroundColor: "#008000" },
              textTransform: "none",
            }}
          >
            Criar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Faça login!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ my: 5 }} />
    </Container>
  );
}
