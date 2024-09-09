export interface State {
  id: number;
  sigla: string;
  nome: string;
}

export interface City {
  id: number;
  nome: string;
}

export interface Address {
  id: string;
  number: string;
  cep: string;
  city: string;
  uf: string;
  userId: string;
}

export type CreateAddressDto = Pick<Address, "number" | "cep" | "city" | "uf">;
