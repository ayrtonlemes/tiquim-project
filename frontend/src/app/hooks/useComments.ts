import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/comment";

export function useComments(idCampaign: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["comments", idCampaign],
    queryFn: () => getComments(idCampaign),
  });

  return { comments: data, isPending, isError };
}
