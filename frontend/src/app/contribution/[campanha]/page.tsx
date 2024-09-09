"use client";
import * as React from "react";
import { Container } from "@mui/material";
import PixMethod from "../../components/contribution-campaign/PixMethod";
import InfoHeader from "../../components/contribution-campaign/InfoHeader";
import CreditCardMethod from "@/app/components/contribution-campaign/CreditCardMethod";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = React.useState("credit");

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <Container sx={{ width: "80%", m: "auto", mb: 5 }}>
      <InfoHeader onPaymentMethodChange={handlePaymentMethodChange} />
      {paymentMethod === "credit" ? <CreditCardMethod /> : <PixMethod />}
    </Container>
  );
}
