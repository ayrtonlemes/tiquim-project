import { Reward } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// Define CreateRewardDto para criar uma nova recompensa
export type CreateRewardDto = {
  title: string;
  description: string;
  minimumAmount: Decimal;
  imageUrl?: string | null;
  campaignId: string;
};

// Define RewardDto que representa uma recompensa
export type RewardDto = {
  id: string;
  title: string;
  description: string;
  minimumAmount: Decimal;
  imageUrl?: string | null;
  campaignId: string;
  createdAt: Date;
  updatedAt: Date;
};
