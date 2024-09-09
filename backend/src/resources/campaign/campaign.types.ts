import { Campaign } from "@prisma/client";

export type CreateCampaignDto = Pick<
  Campaign,
  | "goal"
  | "deadline"
  | "title"
  | "description"
  | "preview"
  | "category"
  | "state"
  | "city"
  | "imageUrl"
>;
export type UpdateCampaignDto = Pick<Campaign, "title" | "description" | "preview" | "imageUrl">;
export type CampaignDto = Campaign;
