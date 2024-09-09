import api from "./api";
import Contribution, { CreateContributionDto } from "../types/contribution";
import { Campaign } from "../types/campaign";
import { getCampaignDetails } from "./campaign";

export async function getContributions(userId: string): Promise<Contribution[]> {
  if (userId) {
    return api.get(`/contribution?userId=${userId}`).then((response) => response.data);
  } else return api.get(`/contribution`, { params: { userId } }).then((response) => response.data);
}

export async function getCampaignsContributed(contributions: Contribution[]): Promise<Campaign[]> {
  if (contributions) {
    const filteredContributions = contributions.map((contribution) => contribution.campaignId);
    const uniqueCampaigns = [...new Set(filteredContributions)];

    try {
      const campaignsYouContributed = await Promise.all(
        uniqueCampaigns.map((campaignId) => getCampaignDetails(campaignId)),
      );
      return campaignsYouContributed;
    } catch (error) {
      console.log(error);
      throw new Error("Could not fetch campaigns you have contributed");
    }
  } else return [];
}

export async function createContribution(contributionData: CreateContributionDto) {
  if (contributionData) {
    return api.post("/contribution", contributionData).then((response) => response.data);
  }
}
