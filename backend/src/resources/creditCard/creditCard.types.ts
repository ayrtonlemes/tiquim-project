import { CreditCard } from "@prisma/client";

export type CreateCreditCardDto = Pick<
  CreditCard,
  "cardNumber" | "cardExpiryDate" | "cardHolderName" | "cardLastDigits" | "cvv"
>;
export type UpdateCreditCardDto = CreateCreditCardDto;
export type CreditCardDto = CreditCard;

export type CardDto = Omit<CreditCard, "cardNumber">;
