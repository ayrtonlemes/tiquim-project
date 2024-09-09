import React from "react";
import { Stack, Typography } from "@mui/material";

export function YourCampaignsHeader() {
  const [textFieldValue, setTextFieldValue] = React.useState("");

  const handleSearch = () => {};

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <span>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Suas campanhas
        </Typography>

        <Typography variant="body2" color="text.secondary" component="h2" sx={{ mb: 1.5 }}>
          Veja as campanhas que você criou e acompanhe o progresso dos seus projetos e causas!
        </Typography>
      </span>
    </Stack>
  );
}
