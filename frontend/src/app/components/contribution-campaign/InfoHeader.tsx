import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { useState } from "react";
import { Box, FormControl, FormLabel, Grid, OutlinedInput, FormHelperText } from "@mui/material";
import { useContext } from "react";
import PaymentContext from "../../states/PaymentProvider";

interface InfoProps {
  onPaymentMethodChange: (method: string) => void;
}

export default function InfoHeader({ onPaymentMethodChange }: InfoProps) {
  const {
    amount,
    setAmount,
    contributionAmount,
    setContributionAmount,
    paymentMethod,
    setPaymentMethod,
  } = useContext(PaymentContext);

  const [error, setError] = useState<string | null>(null);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = (event.target as HTMLInputElement).value;
    setPaymentMethod(method);
    onPaymentMethodChange(method);
  };

  const handleContributionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = rawValue
      ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(parseFloat(rawValue) / 100)
      : "R$ "; // Valor padrão quando o campo está vazio

    const numericValue = parseFloat(rawValue) / 100;
    if (numericValue < 1) {
      setError("O valor deve ser no mínimo 1,00");
    } else {
      setError(null);
    }

    setContributionAmount(formattedValue);
    setAmount(numericValue);
  };

  return (
    <Box
      sx={{
        width: "80%",
        m: "auto",
        mb: 5,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h6">
                <strong>{contributionAmount}</strong>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>doação</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ ml: 4 }} error={!!error}>
            <FormLabel>Valor da Contribuição</FormLabel>
            <OutlinedInput
              value={contributionAmount}
              onChange={handleContributionChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              startAdornment={<Typography sx={{ mr: 1 }}></Typography>}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <RadioGroup row value={paymentMethod} onChange={handlePaymentMethodChange}>
            <FormControlLabel value="credit" control={<Radio />} label="Cartão de Crédito" />
            <FormControlLabel value="pix" control={<Radio />} label="Pix" />
          </RadioGroup>
        </Grid>
      </Grid>
    </Box>
  );
}