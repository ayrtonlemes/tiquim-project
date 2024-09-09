import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../services/campaign";

export function useCampaigns(searchQuery: String) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["campaigns", searchQuery],
    queryFn: () => getCampaigns(searchQuery),
  });

  return { campaigns: data, isPending, isError };
}
