import { useQuery } from "@tanstack/react-query";
import { getCampaignsContributed, getContributions } from "../services/contribution";
import Contribution from "../types/contribution";

export function useContributions(userId: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["userContributions", userId],
    queryFn: () => getContributions(userId),
  });

  return { contributions: data, isPending, isError };
}

export function useCampaignsByContribution(contributions: Contribution[]) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["userCampaignContribution", contributions],
    queryFn: () => getCampaignsContributed(contributions),
  });

  return { yourContributions: data, isPending, isError };
}
