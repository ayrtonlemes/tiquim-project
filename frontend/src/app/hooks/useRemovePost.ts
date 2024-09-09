import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePost } from "../services/post";

export function useRemovePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idCampaign: string) => removePost(idCampaign),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
