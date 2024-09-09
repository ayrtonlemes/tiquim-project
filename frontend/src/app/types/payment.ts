interface Payment {
  id: string;
  type: string;
  cardNumber: string; //coloquei aqui mas ainda nao é salvo no banco.
  cardHolderName: string;
  cardLastDigits: string;
  expirationDate: string;
  cvv: string;
}

export type CreatePaymentMethodDto = "CREDIT" | "PIX";

export type CreditCardDto = Omit<Payment, "id" | "type">;
