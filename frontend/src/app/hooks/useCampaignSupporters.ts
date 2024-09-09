import { useQuery } from "@tanstack/react-query";
import { getCampaignSupporters } from "../services/campaign";

export function useCampaignSupporters(campaignId: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["campaignSupporters", campaignId],
    queryFn: () => getCampaignSupporters(campaignId),
  });

  return { supporters: data, isPending, isError };
}
