import useAuthContext from "./useAuthContext";
import { useCampaignDetails } from "./useCampaignDetails";

const useCampaignOwner = (idCampaign: string) => {
  const { campaign, isPending, isError } = useCampaignDetails(idCampaign);

  const { id } = useAuthContext();

  if (isPending) return { isPending, isOwner: false };
  if (isError) return { isError, isOwner: false };

  const isOwner = campaign?.userId === id;

  return { isPending, isOwner, campaign };
};

export default useCampaignOwner;
