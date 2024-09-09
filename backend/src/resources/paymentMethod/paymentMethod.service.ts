import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { PaymentMethodDto, CreatePaymentMethodDto, PaymentType } from "./paymentMethod.types";
import { PaymentMethodType } from "../paymentMethodType/paymentMethodType.constants";

const prisma = new PrismaClient();

export const createPaymentMethod = async (paymentMethod: {
  type: string;
}): Promise<PaymentMethodDto> => {
  let paymentTypeId: string;

  if (paymentMethod["type"] === "CREDIT") {
    paymentTypeId = PaymentMethodType.CREDIT;
  } else if (paymentMethod["type"] === "PIX") {
    paymentTypeId = PaymentMethodType.PIX;
  } else {
    throw new Error(`Tipo de pagamento inválido: ${paymentMethod}`);
  }

  return await prisma.paymentMethod.create({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      paymentTypeId,
    },
  });
};

export const listPaymentMethods = async (
  uid: string,
  skip?: number,
  take?: number,
): Promise<PaymentMethodDto[]> => {
  return prisma.paymentMethod.findMany({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readPaymentMethod = async (
  id: string,
  uid: string,
): Promise<PaymentMethodDto | null> => {
  return await prisma.paymentMethod.findUnique({
    select: {
      id: true,
      paymentTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updatePaymentMethod = async (
  id: string,
  updatedPaymentMethod: PaymentMethodDto,
  uid: string,
): Promise<PaymentMethodDto | null> => {
  return await prisma.paymentMethod.update({
    where: { id },
    data: updatedPaymentMethod,
  });
};

export const deletePaymentMethod = async (id: string): Promise<PaymentMethodDto> => {
  return await prisma.paymentMethod.delete({ where: { id: id } });
};
