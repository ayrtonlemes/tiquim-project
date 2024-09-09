"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useSnackbar from "../hooks/useSnackbar";
import { getAvatarUser, updateUser } from "../services/user";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { UserDto } from "../types/user";
import { useCheckAvailableEmail, useUser } from "../hooks/useUser";
import { useCities, useStates } from "../hooks/useAddress";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import InputFileUpload from "../components/FileUpload";
import { useRouter } from "next/navigation";
import { State } from "../types/address";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialState = {
  name: "",
  email: "",
  password: "",
  city: "",
  state: "",
  avatarUrl: "",
};

export default function EditAccount() {
  const router = useRouter();
  const { setSnackbar } = useSnackbar();
  const { id } = useAuthContext();
  const [userInfo, setUserInfo] = useState<UserDto>(initialState);
  const { user } = useUser(id);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { states } = useStates();
  const [selectedState, setSelectedState] = React.useState<string>(userInfo.state);

  function sortStatesByName(states: State[]): State[] {
    return states.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const sortedStates = sortStatesByName(states || []);

  const { cities } = useCities(selectedState);
  const [selectedCity, setSelectedCity] = React.useState<string>(userInfo.city);

  const handleStateChange = (event: SelectChangeEvent) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setUserInfo({ ...userInfo, state: newState });
    setSelectedCity("");
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    setUserInfo({ ...userInfo, city: newCity });
  };

  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (user?.avatarUrl && user.avatarUrl.length > 0) {
        const image = await getAvatarUser(user.avatarUrl);
        setAvatarUrl(image);
      }
    };
    fetchImage();
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        password: "",
        city: user.city,
        state: user.state,
        avatarUrl: user.avatarUrl,
      });
      setSelectedState(user.state || "");
      setSelectedCity(user.city);
    }
  }, [user]);

  if (id == "") {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", my: 5 }}>
        Realize o login para editar as informações do seu perfil.
      </Typography>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedUserInfo = {
      name: userInfo.name.toString(),
      email: userInfo.email.toString(),
      password: userInfo.password.toString(),
      city: userInfo.city.toString(),
      state: userInfo.state.toString(),
      avatarUrl: userInfo.avatarUrl.toString(),
    };

    try {
      const response = await updateUser(id, formattedUserInfo, selectedFile);
      setSnackbar("Informações editadas com sucesso!");
      router.push("/");
    } catch (err) {
      setSnackbar("Erro ao efetuar a edição das informações", "error");
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                value={userInfo.name}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, name: event.target.value });
                }}
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
                autoComplete="email"
                value={userInfo.email}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, email: event.target.value });
                }}
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
                value={userInfo.password}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, password: event.target.value });
                }}
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
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="state">Estado</InputLabel>
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
                  src={selectedFile ? URL.createObjectURL(selectedFile) : avatarUrl}
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
            Editar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
