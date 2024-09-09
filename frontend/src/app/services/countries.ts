import axios from "axios";

async function getCountries() {
  const { data } = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/paises");
  return data.map((country: any) => country.nome);
}

export default getCountries;
