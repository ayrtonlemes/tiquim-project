import { useQuery } from "@tanstack/react-query";
import { getUserCampaigns } from "../services/campaign";

export function useUserCampaigns(userId: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["userCampaigns", userId],
    queryFn: () => getUserCampaigns(userId),
  });

  return { campaigns: data, isPending, isError };
}
