"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import { usePathname } from "next/navigation";

const logoStyle = {
  width: "140px",
  height: "auto",
};

export default function Footer() {
  const path = usePathname();
  if (path === "/login" || path === "/cadastro") {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 5 },
        textAlign: { sm: "center", md: "left" },
        paddingRight: 20,
        paddingLeft: 8,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Tiquim
          </Typography>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: "text.secondary",
            }}
          >
            <IconButton
              color="inherit"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: "center" }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Campanha
          </Typography>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Novas
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Destaques
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Populares
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Companhia
          </Typography>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Sobre nós
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Carreira
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Imprensa
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Termos Legais
          </Typography>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Segurança
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Privacidade
          </Link>
          <Link color="text.secondary" href="#" sx={{ textDecoration: "none" }}>
            Contato
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
        }}
      ></Box>
    </Box>
  );
}
