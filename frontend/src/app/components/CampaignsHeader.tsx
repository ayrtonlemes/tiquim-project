import React from "react";
import { Stack, Typography } from "@mui/material";

export function CampaignsHeader() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Todas as campanhas
        </Typography>

        <Typography variant="body2" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          Descubra companhas e ajude projetos e causas ao redor do mundo!
        </Typography>
      </span>
    </Stack>
  );
}
