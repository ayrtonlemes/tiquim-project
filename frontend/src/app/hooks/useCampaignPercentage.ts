import { useQuery } from "@tanstack/react-query";
import { getCampaignPercentage } from "../services/campaign";

export function useCampaignPercentage(campaignId: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["contribution", campaignId],
    queryFn: () => getCampaignPercentage(campaignId),
  });

  return { percentage: data, isPending, isError };
}
