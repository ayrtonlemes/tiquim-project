import { useQuery } from "@tanstack/react-query";
import { getCampaignDetails } from "../services/campaign";

export function useCampaignDetails(idCampaign: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["campaignDetails"],
    queryFn: () => getCampaignDetails(idCampaign),
  });

  return { campaign: data, isPending, isError };
}
