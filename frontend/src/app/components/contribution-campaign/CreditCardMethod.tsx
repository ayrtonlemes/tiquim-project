import * as React from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import Review from "./Review";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./AddressForm";
import CreditCardDetails from "./CreditCardDetails";
import PaymentContext from "@/app/states/PaymentProvider";
import { createAddress } from "@/app/services/address";
import { createCreditCard, createPaymentMethod } from "@/app/services/paymentMethod";
import { createContribution } from "@/app/services/contribution";
import { usePathname, useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { Campaign } from "@/app/types/campaign";
import { useState } from "react";
import { useContext } from "react";


const steps = ["Detalhes do Pagamento", "Endereço de Cobrança", "Revisão de Pagamento"];

function getStepContent(step: number, errors: any, setErrors: React.Dispatch<React.SetStateAction<any>>) {
  switch (step) {
    case 0:
      return <CreditCardDetails errors={errors} setErrors={setErrors} />;
    case 1:
      return <AddressForm errors={errors} setErrors={setErrors} />;
    case 2:
      return <Review />;
    default:
      throw new Error("Passo desconhecido");
  }
}
const initialAddressInfoState = {
  cep: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  uf: "",
  country: "",
};

const initialCardDataState = {
  cardNumber: "",
  cardHolderName: "",
  expirationDate: "",
  cvv: "",
};

const initialContributionData = {
  amount: 0,
  campaignId: "",
  paymentMethodId: ",",
};

export default function CreditCardMethod() {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { setSnackbar } = useSnackbar();
  const router = useRouter();

  //verificar melhor como obter o id da campanha: Utilizar contexto

  const pathname = usePathname();
  const campaignId = pathname ? pathname.split("/").pop() : null;

  const {
    amount,
    contributionAmount,
    cardInfo,
    addressInfo,
    paymentMethod,
    saveAddress,
    saveCard,
    setAmount,
  } = React.useContext(PaymentContext);
  // saveAddress, setSaveAddress do context para pegar os dados

  const [errors, setErrors] = React.useState({
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });


  const handleNext = () => {
    if (amount < 1 || isNaN(amount)) {
      setSnackbar("Valor de doação inválido!", "error");
      return;
    }

    if (activeStep === 0) {
      const newErrors = {
        cardNumber: cardInfo.cardNumber ? "" : "Esse campo é obrigatório",
        cardHolderName: cardInfo.cardHolderName ? "" : "Esse campo é obrigatório",
        expirationDate: cardInfo.expirationDate ? "" : "Esse campo é obrigatório",
        cvv: cardInfo.cvv ? "" : "Esse campo é obrigatório",
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (Object.values(newErrors).some((error) => error)) {
        return;
      }
    }

    if (activeStep === 1) {
      const newErrors = {
        zip: addressInfo.zip ? "" : "Esse campo é obrigatório",
        street: addressInfo.street ? "" : "Esse campo é obrigatório",
        number: addressInfo.number ? "" : "Esse campo é obrigatório",
        neighborhood: addressInfo.neighborhood ? "" : "Esse campo é obrigatório",
        city: addressInfo.city ? "" : "Esse campo é obrigatório",
        state: addressInfo.state ? "" : "Esse campo é obrigatório",
        country: addressInfo.country ? "" : "Esse campo é obrigatório",
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (Object.values(newErrors).some((error) => error)) {
        return;
      }
    }

    if (activeStep === 2 && paymentMethod === "credit") {
      //hora que confirma o pagamento pq chegou na última aba e o usuário escolheu cartão de crédito
      handleSubmit(campaignId!);
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (idCampaign: string) => {
    console.log(amount);
    console.log(contributionAmount);
    console.log(cardInfo);
    console.log(addressInfo);

    if (saveAddress) {
      //se address já estiver la nao salva, uma dica pode ser verificar cep e numero do endereço

      const formatedAddressData = {
        ...initialAddressInfoState,
        cep: addressInfo.zip,
        street: addressInfo.zip,
        number: addressInfo.number.toString(),
        neighborhood: addressInfo.neighborhood,
        city: addressInfo.city,
        uf: addressInfo.state,
        country: addressInfo.country,
      };

      const savedAddress = await createAddress(formatedAddressData);
    }

    if (saveCard) {
      const formattedCardData = {
        ...initialCardDataState,
        cardNumber: cardInfo.cardNumber,
        cardHolderName: cardInfo.cardHolderName,
        expirationDate: cardInfo.expirationDate,
        cardLastDigits: cardInfo.cardNumber.slice(-4),
        cvv: cardInfo.cvv,
      };
      const saveCard = await createCreditCard(formattedCardData);
      console.log("Sending Card data:", formattedCardData);
    }
    try {
      const formattedPM = { type: paymentMethod };
      const savedPaymentMethod = await createPaymentMethod(paymentMethod);

      const formattedContribution = {
        ...initialContributionData,
        amount: amount,
        campaignId: campaignId!,
        paymentMethodId: savedPaymentMethod.id,
      };

      const savedContribution = await createContribution(formattedContribution);
      setSnackbar("Contribuição realizada com sucesso!", "success");
      router.push(`/campaign/${idCampaign}`);
    } catch (err) {
      setSnackbar("Erro ao criar a contribuição", "error");
    }
  };

  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepIcon-root.Mui-completed": { color: "green" },
                "& .MuiStepIcon-root.Mui-active": { color: "green" },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep, errors, setErrors)}
      <Box
        sx={[
          {
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "end",
            flexGrow: 1,
            gap: 1,
            pb: { xs: 12, sm: 0 },
            mt: "30px",
          },
          activeStep !== 0 ? { justifyContent: "space-between" } : { justifyContent: "flex-end" },
        ]}
      >
        {activeStep !== 0 && (
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack}
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              width: { xs: "100%", sm: "fit-content" },
              textTransform: "none",
              backgroundColor: "#32a852",
              color: "white",
              "&:hover": { backgroundColor: "#008000" },
            }}
          >
            Anterior
          </Button>
        )}
        <Button
          variant="contained"
          endIcon={<ChevronRightRoundedIcon />}
          onClick={handleNext}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            textTransform: "none",
            backgroundColor: "#32a852",
            color: "white",
            "&:hover": { backgroundColor: "#008000" },
          }}
        >
          {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </Box>
    </Box>
  );
}
