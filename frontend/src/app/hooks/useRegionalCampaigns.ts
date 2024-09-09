import { useQuery } from "@tanstack/react-query";
import { getRegionalCampaigns } from "../services/campaign";

export function useRegionalCampaigns(state: string, city: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["region", state, city],
    queryFn: () => getRegionalCampaigns(state, city),
    enabled: !!city && !!state,
  });
  return { regionalCampaigns: data, isPending, isError };
}
