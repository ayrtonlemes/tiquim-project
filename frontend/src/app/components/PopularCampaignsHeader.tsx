import React from "react";
import { Stack, Typography } from "@mui/material";

export function PopularCampaignsHeader() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Campanhas Populares
        </Typography>

        <Typography variant="body2" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          Veja as campanhas que estão em alta e recebendo mais apoio!
        </Typography>
      </span>
    </Stack>
  );
}
