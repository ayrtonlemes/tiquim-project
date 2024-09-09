import { useQuery } from "@tanstack/react-query";
import getCountries from "../services/countries";

export function useCountries() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return { countries: data, isLoading, isError };
}
