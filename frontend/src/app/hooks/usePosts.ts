import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/post";

export function usePosts(idCampaign: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", idCampaign],
    queryFn: () => getPosts(idCampaign),
  });

  return { posts: data, isPending, isError };
}
