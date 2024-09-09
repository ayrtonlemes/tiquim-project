import { PaymentMethod } from "@prisma/client";
//export type CreatePaymentMethodDto = Pick<PaymentMethod, "type">;

export type CreatePaymentMethodDto = {
  typeId: PaymentType;
};
export type PaymentMethodDto = PaymentMethod;

export type PaymentType = "CREDIT" | "PIX";
