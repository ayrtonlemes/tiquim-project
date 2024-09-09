import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import PaymentContext from "../../states/PaymentProvider";

export default function Review() {
  const { contributionAmount, paymentMethod, cardInfo, addressInfo } = useContext(PaymentContext);

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Doação" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {contributionAmount}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack direction="column" divider={<Divider flexItem />} spacing={2} sx={{ my: 2 }}>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalhes do Endereço
          </Typography>
          {addressInfo ? (
            <Typography gutterBottom sx={{ color: "text.secondary" }}>
              {`${addressInfo.street || ""}, ${addressInfo.number || ""}, ${addressInfo.neighborhood || ""}, ${addressInfo.city || ""}, ${addressInfo.state || ""}, ${addressInfo.country || ""}, CEP: ${addressInfo.zip || ""}`}
            </Typography>
          ) : (
            <Typography gutterBottom sx={{ color: "text.secondary" }}>
              Endereço não disponível
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalhes do Cartão
          </Typography>
          {cardInfo ? (
            <Grid container>
              <Stack direction="row" spacing={1} useFlexGap sx={{ width: "100%", mb: 1 }}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Número do Cartão:
                </Typography>
                <Typography variant="body2">{cardInfo.cardNumber || "Não disponível"}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} useFlexGap sx={{ width: "100%", mb: 1 }}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Nome do Titular:
                </Typography>
                <Typography variant="body2">
                  {cardInfo.cardHolderName || "Não disponível"}
                </Typography>
              </Stack>
            </Grid>
          ) : (
            <Typography gutterBottom sx={{ color: "text.secondary" }}>
              Detalhes do cartão não disponíveis
            </Typography>
          )}
        </div>
      </Stack>
    </Stack>
  );
}
