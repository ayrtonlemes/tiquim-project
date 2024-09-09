import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { reportCampaignDto, CreateReportCampaignDto } from "./reportCampaign.types";

const prisma = new PrismaClient();

export const listReportCampaigns = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<reportCampaignDto[]> => {
  return prisma.reportCampaign.findMany({
    select: {
      id: true,
      campaignId: true,
      userId: true,
      reason: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { campaignId: campaignId },
    skip,
    take,
  });
};

export const createReportCampaign = async (
  reportCampaign: CreateReportCampaignDto,
  uid: string,
): Promise<reportCampaignDto> => {
  const campaign = await prisma.campaign.findUnique({
    select: {
      id: true,
    },
    where: {
      id: reportCampaign.campaignId,
    },
  });

  if (!campaign) {
    throw new Error("A campanha à ser denunciado não existe");
  }

  const alreadyReported = await prisma.reportCampaign.findFirst({
    select: { id: true },
    where: { campaignId: campaign.id, userId: uid },
  });

  if (alreadyReported) {
    throw new Error("Só é possível denunciar uma vez");
  }

  return await prisma.reportCampaign.create({
    select: {
      id: true,
      campaignId: true,
      reason: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...reportCampaign,
      userId: uid,
    },
  });
};

export const deleteReportCampaign = async (id: string): Promise<reportCampaignDto> => {
  return await prisma.reportCampaign.delete({ where: { id: id } });
};

export const deleteAllReportCampaigns = async (campaignId: string): Promise<void> => {
  await prisma.reportCampaign.deleteMany({ where: { campaignId: campaignId } });
};
