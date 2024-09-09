import React from "react";
import { Stack, Typography } from "@mui/material";

export function RegionalCampaignsHeader() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Campanhas na sua região
        </Typography>

        <Typography variant="body2" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          Encontre e apoie campanhas locais que fazem a diferença na sua comunidade!
        </Typography>
      </span>
    </Stack>
  );
}
