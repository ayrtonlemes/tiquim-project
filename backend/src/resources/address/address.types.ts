import { Address } from "@prisma/client";

export type CreateAddressDto = Pick<Address, "number" | "cep" | "city" | "uf">;

export type AddressDto = Address;
