import { PrismaClient, Reward } from "@prisma/client"; // Certifique-se de que o tipo Reward está sendo importado corretamente
import { CreateRewardDto, RewardDto } from "./reward.types";

const prisma = new PrismaClient();

// Função utilitária para mapear Reward para RewardDto
const mapToRewardDto = (reward: Reward): RewardDto => ({
  id: reward.id,
  title: reward.title,
  description: reward.description,
  minimumAmount: reward.minimumAmount,
  imageUrl: reward.imageUrl,
  campaignId: reward.campaignId,
  createdAt: reward.createdAt,
  updatedAt: reward.updatedAt,
});

export const listRewards = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<RewardDto[]> => {
  const rewards = await prisma.reward.findMany({
    where: { campaignId },
    skip,
    take,
  });
  return rewards.map(mapToRewardDto);
};

export const createReward = async (reward: CreateRewardDto): Promise<RewardDto> => {
  const createdReward = await prisma.reward.create({
    data: reward,
  });
  return mapToRewardDto(createdReward);
};

export const readReward = async (id: string): Promise<RewardDto | null> => {
  const reward = await prisma.reward.findUnique({
    where: { id },
  });
  return reward ? mapToRewardDto(reward) : null;
};

export const updateReward = async (
  id: string,
  data: Partial<CreateRewardDto>,
): Promise<RewardDto | null> => {
  const updatedReward = await prisma.reward.update({
    where: { id },
    data,
  });
  return updatedReward ? mapToRewardDto(updatedReward) : null;
};

export const deleteReward = async (id: string): Promise<RewardDto | null> => {
  const deletedReward = await prisma.reward.delete({
    where: { id },
  });
  return deletedReward ? mapToRewardDto(deletedReward) : null;
};
