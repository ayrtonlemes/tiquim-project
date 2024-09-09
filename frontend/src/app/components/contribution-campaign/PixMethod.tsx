import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode.react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Button } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PaymentContext from "@/app/states/PaymentProvider";
import { createPaymentMethod } from "@/app/services/paymentMethod";
import { createContribution } from "@/app/services/contribution";
import { usePathname, useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";

const initialContributionData = {
  amount: 0,
  campaignId: "",
  paymentMethodId: ",",
};
export default function PixMethod() {
  const [pixKey, setPixKey] = React.useState("");

  //verificar melhor como obter o id da campanha: Utilizar contexto
  const pathname = usePathname();
  const campaignId = pathname ? pathname.split("/").pop() : null;

  const { amount, contributionAmount, cardInfo, addressInfo, paymentMethod, setAmount } =
    React.useContext(PaymentContext);

  const { setSnackbar } = useSnackbar();
  const router = useRouter();

  React.useEffect(() => {
    setPixKey(uuidv4());
  }, []);

  const handleSubmit = async () => {
    try {
      const savedPayment = await createPaymentMethod(paymentMethod);
      console.log("Forma de pagamento via pix cadastrada");

      const formattedContribution = {
        ...initialContributionData,
        amount: amount,
        campaignId: campaignId!,
        paymentMethodId: savedPayment.id,
      };
      const savedContribution = await createContribution(formattedContribution);
      setSnackbar("Contribuição realizada com sucesso!", "success");
      router.push(`/campaign/${campaignId}`);
    } catch (err) {
      console.log("Erro ao finalizar pagamento:", err);
      setSnackbar("Erro ao finalizar o pagamento", "error");
    }
  };

  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Stack spacing={{ sm: 6 }}>
        {pixKey && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert severity="warning" icon={<WarningRoundedIcon />}>
              Seu pedido será processado assim que recebermos a confirmação da transferência via
              Pix.
            </Alert>
            <Typography variant="body1" gutterBottom>
              Por favor, faça a transferência escaneando o QR Code abaixo ou a chave Pix.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <QRCode value={`${pixKey}-${Math.random().toString(36).substr(2, 9)}`} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Chave Pix:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {pixKey}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                  width: { xs: "100%", sm: "fit-content" },
                  textTransform: "none",
                  backgroundColor: "#32a852",
                  color: "white",
                  "&:hover": { backgroundColor: "#008000" },
                }}
                onClick={handleSubmit} //usando o botão confirmar para simular a "confirmação do pix"
              >
                Confirmar
              </Button>
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
