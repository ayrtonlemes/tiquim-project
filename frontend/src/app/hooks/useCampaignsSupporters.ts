import { useQuery } from "@tanstack/react-query";
import { getCampaignsSupporters } from "../services/campaign";

export function useCampaignsSupporters() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaignsSupporters(),
  });

  return { supporters: data, isPending, isError };
}
