import React from "react";
import { Stack, Typography } from "@mui/material";

export function RecentCampaignsHeader() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Campanhas Recentes
        </Typography>

        <Typography variant="body2" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          Explore as campanhas mais recentes e veja o que está acontecendo agora!
        </Typography>
      </span>
    </Stack>
  );
}
