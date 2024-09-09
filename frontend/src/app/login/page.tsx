"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "../components/Copyright";
import { IconButton, InputAdornment, Link, Typography } from "@mui/material";
import useAuthContext from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";
import useSnackbar from "../hooks/useSnackbar";
import { login } from "../services/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const { setId } = useAuthContext();
  const isLoggedIn = useRedirectIfLoggedIn();
  const { setSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const credentials = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    try {
      const response = await login(credentials);
      if (!response) {
        setSnackbar("Erro ao efetuar o login", "error");
        throw new Error("Error on login attempt");
      }

      setId(response.id);

      setSnackbar("Login efetuado com sucesso!");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        setSnackbar("Senha ou email incorretos. Tente novamente.", "error");
      } else {
        setSnackbar("Erro ao efetuar o login", "error");
      }
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(side_login.svg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          // 551 x 366
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate method="POST" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
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
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar meu usuário e senha"
            />
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
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Não tem uma conta? Criar conta"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
