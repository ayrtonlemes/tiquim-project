export interface Campaign {
  id: string;
  title: string;
  preview: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  category: string;
  state: string;
  city: string;
  goal: number;
  userId: string;
}

export type CreateCampaignDto = Omit<Campaign, "id" | "imageUrl">;

export type UpdateCampaignDto = Pick<Campaign, "title" | "description" | "preview" | "imageUrl">;
