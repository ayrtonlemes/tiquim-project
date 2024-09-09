import { PrismaClient } from "@prisma/client";
import { ContributionDto, CreateContributionDto } from "./contribution.types";

const prisma = new PrismaClient();

export const createContribution = async (
  contribution: CreateContributionDto,
  uid: string,
): Promise<ContributionDto> => {
  const paymentMethod = await prisma.paymentMethod.findUnique({
    select: {
      id: true,
    },
    where: { id: contribution.paymentMethodId },
  });
  if (!paymentMethod) {
    throw new Error("Método de pagamento não pertence ao usuário logado");
  }
  return await prisma.contribution.create({
    select: {
      id: true,
      amount: true,
      userId: true,
      campaignId: true,
      paymentMethodId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...contribution,
      userId: uid,
    },
  });
};

export const listContributions = async (
  campaignId: string,
  uid: string,
  skip?: number,
  take?: number,
): Promise<ContributionDto[]> => {
  if (campaignId) {
    return await prisma.contribution.findMany({
      select: {
        id: true,
        amount: true,
        userId: true,
        campaignId: true,
        paymentMethodId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { campaignId: campaignId },
      skip,
      take,
    });
  } else {
    return await prisma.contribution.findMany({
      select: {
        id: true,
        amount: true,
        userId: true,
        campaignId: true,
        paymentMethodId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: uid },
      skip,
      take,
    });
  }
};

export const readContribution = async (
  id: string,
  uid: string,
): Promise<ContributionDto | null> => {
  return await prisma.contribution.findUnique({
    select: {
      id: true,
      amount: true,
      userId: true,
      campaignId: true,
      paymentMethodId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id: id, userId: uid },
  });
};

export const calculatePercentage = async (campaignId: string): Promise<Number | null> => {
  const contributions = await prisma.contribution.findMany({
    select: {
      amount: true,
      userId: true,
    },
    where: { campaignId: campaignId },
  });
  if (contributions.length === 0) return null;

  const totalAmount = contributions.reduce((sum, contribution) => {
    return sum + parseFloat(contribution.amount.toString());
  }, 0);

  const campaign = await prisma.campaign.findUnique({
    select: { goal: true },
    where: { id: campaignId },
  });

  if (campaign) {
    const goal = parseFloat(campaign.goal.toString());
    return totalAmount / goal;
  }
  return null;
};

export const totalSupporters = async (campaignId: string): Promise<number> => {
  const count = await prisma.contribution.groupBy({
    by: ["userId"],
    where: {
      campaignId: campaignId,
    },
  });

  return count.length;
};

export const listTotalSupporters = async (): Promise<
  Array<{ campaignId: string; count: number }>
> => {
  const results = await prisma.contribution.groupBy({
    by: ["campaignId", "userId"],
    _count: {
      _all: true,
    },
  });

  const list: { campaignId: string; count: number }[] = results.map((result) => ({
    campaignId: result.campaignId,
    count: result._count._all,
  }));

  return list;
};

export const listSupporters = async (
  campaignId: string,
): Promise<{
  total: number;
  supporters: Array<{ id: string; name: string; avatarUrl: string | null }>;
}> => {
  const supportersIds = await prisma.contribution.findMany({
    where: {
      campaignId: campaignId,
    },
    select: {
      userId: true,
    },
    distinct: ["userId"],
  });

  const supportersIdsArray = supportersIds.map((contribution) => contribution.userId);

  const supporters = await prisma.user.findMany({
    where: {
      id: { in: supportersIdsArray },
    },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
  });

  return {
    total: supportersIds.length,
    supporters: supporters,
  };
};
