import { useQuery } from "@tanstack/react-query";
import { getYourCampaigns } from "../services/campaign";

export function useYourCampaigns(searchTerm: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["yourCampaigns", searchTerm],
    queryFn: () => getYourCampaigns(searchTerm),
  });

  return { campaigns: data, isPending, isError };
}
