import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import CreditCard, { Focused } from "react-credit-cards-2";
import { Container, FormHelperText, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import PaymentContext from "../../states/PaymentProvider";
import { useCreditCards } from "@/app/hooks/useCreditCards";
import useAuthContext from "@/app/hooks/useAuthContext";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

interface CreditCardDetailsProps {
  errors: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  }>>;
}

export default function CreditCardDetails({ errors, setErrors }: CreditCardDetailsProps) {
  const { id } = useAuthContext();

  const { cardInfo, setCardInfo, saveCard, setSaveCard } = useContext(PaymentContext);

  // saveAddress, setSaveAddress do context para pegar os dados
  const [focus, setFocus] = React.useState<Focused | undefined>(undefined);
  const [selectedCard, setSelectedCard] = React.useState<string | "">("");

  const { cards, isPending, isError } = useCreditCards(id);

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardInfo((prev) => ({ ...prev, cardNumber: formattedValue }));
      setErrors((prev) => ({ ...prev, cardNumber: "" }));
    }
  };

  const handleCvvChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCardInfo((prev) => ({ ...prev, cvv: value }));
      setErrors((prev) => ({ ...prev, cvv: "" }));
    }
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "");
    let formattedValue = value;

    if (value.length >= 2) {
      const month = parseInt(value.substring(0, 2), 10);
      if (month < 1 || month > 12) {
        return; // Mês inválido, não atualiza o estado
      }
    }

    if (value.length >= 4) {
      const year = parseInt(value.substring(2, 4), 10);
      if (year > 80) {
        return; // Ano inválido, não atualiza o estado
      }
    }

    if (value.length > 2) {
      formattedValue = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    if (value.length <= 4) {
      setCardInfo((prev) => ({ ...prev, expirationDate: formattedValue }));
      setErrors((prev) => ({ ...prev, expirationDate: "" }));
    }
  };

  const handleCardNameChange = (event: { target: { value: string } }) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setCardInfo((prev) => ({ ...prev, cardHolderName: upperCaseValue }));
    setErrors((prev) => ({ ...prev, cardHolderName: "" }));
  };

  const handleCardSelectionChange = (event: { target: { value: unknown } }) => {
    const cardId = event.target.value as string;
    if (cards) {
      const card = cards.find((card) => card.id === cardId);
      if (card) {
        setCardInfo({
          cardNumber: card.cardNumber || "",
          cardHolderName: card.cardHolderName || "",
          expirationDate: card.cardExpiryDate,
          cvv: card.cvv || "",
        });

        setSelectedCard(cardId);
        setErrors((prev) => ({ ...prev, cardNumber: "", cardHolderName: "", expirationDate: "", cvv: "" }));
      } else {
        console.warn(`Cartão com ID ${cardId} não encontrado.`);
      }
    } else {
      console.warn("Nenhum cartão encontrado.");
    }
  };

  return (
    <Container sx={{ width: "80%", m: "auto", mb: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormGrid container>
            {cards && cards?.length > 0 && (
              <>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Select
                        value={selectedCard}
                        onChange={handleCardSelectionChange}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>
                          Selecione um cartão salvo
                        </MenuItem>
                        {cards?.map((card) => (
                          <MenuItem key={card.id} value={card.id}>
                            Cartão Final - {card.cardLastDigits}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    label=""
                    sx={{ ml: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontSize: 14 }}>
                    Ou insira novos detalhes do cartão
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item xs={9}>
              <OutlinedInput
                id="card-number"
                autoComplete="card-number"
                placeholder="0000 0000 0000 0000"
                required
                value={cardInfo.cardNumber}
                onChange={handleCardNumberChange}
                onFocus={() => setFocus("number")}
                fullWidth
                error={!!errors.cardNumber}
              />
              {errors.cardNumber && <FormHelperText error>{errors.cardNumber}</FormHelperText>}
            </Grid>
            <Grid item xs={9}>
              <OutlinedInput
                id="card-name"
                autoComplete="card-name"
                placeholder="Seu Nome"
                required
                value={cardInfo.cardHolderName}
                onChange={handleCardNameChange}
                onFocus={() => setFocus("name")}
                fullWidth
                error={!!errors.cardHolderName}
              />
              {errors.cardHolderName && <FormHelperText error>{errors.cardHolderName}</FormHelperText>}
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4.6}>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/AA"
                  required
                  value={cardInfo.expirationDate}
                  onChange={handleExpirationDateChange}
                  onFocus={() => setFocus("expiry")}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  error={!!errors.expirationDate}
                />
                {errors.expirationDate && <FormHelperText error>{errors.expirationDate}</FormHelperText>}
              </Grid>
              <Grid item xs={4.6}>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="CVV"
                  required
                  value={cardInfo.cvv}
                  onChange={handleCvvChange}
                  onFocus={() => setFocus("cvc")}
                  fullWidth
                  inputProps={{ style: { textAlign: "center" } }}
                  error={!!errors.cvv}
                />
                {errors.cvv && <FormHelperText error>{errors.cvv}</FormHelperText>}
              </Grid>
            </Grid>
          </FormGrid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <CreditCard
              number={cardInfo.cardNumber}
              name={cardInfo.cardHolderName}
              expiry={cardInfo.expirationDate}
              cvc={cardInfo.cvv}
              focused={focus}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "green",
                  },
                }}
              />
            }
            label="Salvar cartão de crédito para próximas doações"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
