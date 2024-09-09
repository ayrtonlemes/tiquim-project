import { reportCampaign } from "@prisma/client";

export type CreateReportCampaignDto = Pick<reportCampaign, "campaignId" | "reason">;

export type reportCampaignDto = reportCampaign;
