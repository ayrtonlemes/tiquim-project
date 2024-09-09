import { PrismaClient } from "@prisma/client";
import { AddressDto, CreateAddressDto } from "./address.types";

const prisma = new PrismaClient();

export const createAddress = async (
  address: CreateAddressDto,
  uid: string,
): Promise<AddressDto> => {
  try {
    return await prisma.address.create({
      select: {
        id: true,
        number: true,
        cep: true,
        city: true,
        uf: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...address,
        userId: uid,
      },
    });
  } catch (err) {
    throw err;
  }
};


export const listAddress = async (
  uid: string,
  skip?: number,
  take?: number,
): Promise<AddressDto[] | null> => {
  return await prisma.address.findMany({
    select: {
      id: true,
      number: true,
      cep: true,
      city: true,
      uf: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { userId: uid },
    skip,
    take,
  });
};

export const readUserAddress = async (uid: string): Promise<AddressDto[] | null> => {
  return await prisma.address.findMany({
    select: {
      id: true,
      number: true,
      cep: true,
      city: true,
      uf: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { userId: uid },
  });
};

export const deleteUserAddress = async (id: string, uid: string): Promise<AddressDto> => {
  return await prisma.address.delete({
    where: { id: id, userId: uid },
  });
};
