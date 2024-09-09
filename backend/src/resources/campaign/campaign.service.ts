import { PrismaClient } from "@prisma/client";
import { CampaignDto, CreateCampaignDto, UpdateCampaignDto } from "./campaign.types";

const prisma = new PrismaClient();

export const createCampaign = async (
  campaign: CreateCampaignDto,
  uid: string,
): Promise<CampaignDto> => {
  return await prisma.campaign.create({
    select: {
      id: true,
      goal: true,
      deadline: true,
      title: true,
      description: true,
      preview: true,
      category: true,
      city: true,
      state: true,
      imageUrl: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...campaign,
      userId: uid,
    },
  });
};

export const listCampaigns = async (
  searchTerm: string,
  skip?: number,
  take?: number,
): Promise<CampaignDto[]> => {
  if (searchTerm) {
    return await prisma.campaign.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
      },
      skip: skip,
      take: take,
    });
  } else {
    return await prisma.campaign.findMany({
      select: {
        id: true,
        goal: true,
        deadline: true,
        title: true,
        description: true,
        preview: true,
        category: true,
        city: true,
        state: true,
        imageUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take,
    });
  }
};

export const listUserCampaigns = async (
  searchTerm: string,
  uid: string,
  skip?: number,
  take?: number,
  userId?: string,
): Promise<CampaignDto[]> => {
  if (searchTerm) {
    return await prisma.campaign.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
        userId: uid,
      },
      skip: skip,
      take: take,
    });
  } else {
    return await prisma.campaign.findMany({
      select: {
        id: true,
        goal: true,
        deadline: true,
        title: true,
        description: true,
        preview: true,
        category: true,
        city: true,
        state: true,
        imageUrl: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: userId ?? uid },
      skip,
      take,
    });
  }
};

export const readCampaign = async (id: string): Promise<CampaignDto | null> => {
  return await prisma.campaign.findUnique({
    select: {
      id: true,
      goal: true,
      deadline: true,
      title: true,
      description: true,
      preview: true,
      category: true,
      city: true,
      state: true,
      imageUrl: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateCampaign = async (
  id: string,
  updatedCampaign: UpdateCampaignDto,
  uid: string,
): Promise<CampaignDto | null> => {
  return await prisma.campaign.update({
    where: { id: id, userId: uid },
    data: updatedCampaign,
  });
};

export const closeCampaign = async (id: string): Promise<CampaignDto | null> => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return await prisma.campaign.update({
    where: { id: id },
    data: {
      deadline: yesterday.toISOString(),
    },
  });
};

export const deleteCampaign = async (id: string, uid: string): Promise<CampaignDto> => {
  return await prisma.campaign.delete({ where: { id: id, userId: uid } });
};

export const listRegionalCampaigns = async (
  city: string,
  state: string,
  skip?: number,
  take?: number,
): Promise<CampaignDto[]> => {
  const campaignsInCity = await prisma.campaign.findMany({
    where: {
      city: city,
      state: state,
    },
    skip: skip,
    take: take,
  });

  const remainingTake = take ? take - campaignsInCity.length : undefined;
  const campaignsInState = await prisma.campaign.findMany({
    where: {
      city: {
        not: city,
      },
      state: state,
    },
    skip: skip && remainingTake ? Math.max(skip - campaignsInCity.length, 0) : undefined,
    take: remainingTake,
  });

  const combinedCampaigns = campaignsInCity.concat(campaignsInState);

  return combinedCampaigns;
};
