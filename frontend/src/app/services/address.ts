import axios from "axios";
import { Address, CreateAddressDto } from "../types/address";
import api from "./api";

export default async function getAddress(cep: string) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (data.erro) {
    return null;
  }

  return data;
}

export async function getStates() {
  const { data } = await axios.get(`https://brasilapi.com.br/api/ibge/uf/v1`);

  if (data.erro) {
    return null;
  }

  return data;
}

export async function getCities(state: string) {
  const { data } = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`);

  if (data.erro) {
    return null;
  }

  return data;
}

export async function createAddress(address: CreateAddressDto) {
  const formData = new FormData();

  formData.append("number", address.number.toString());
  formData.append("cep", address.cep);
  formData.append("city", address.city);
  formData.append("uf", address.uf);

  return api
    .post(`/address`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

export async function verifyAddress(cep: string, number: string) {
  const data = await api.get("");
}

export async function getUserAddresses(id: string): Promise<Address[]> {
  return api.get(`/address/${id}`).then((response) => response.data);
}
