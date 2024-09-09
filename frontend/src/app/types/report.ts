export interface ReportCampaign {
  id: string;
  reason: string;
  userId: string;
  campaignId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateReportCampaignDTO = Pick<ReportCampaign, "reason" | "campaignId">;
