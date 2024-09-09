import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CommentDto, CreateCommentDto } from "./comment.types";

const prisma = new PrismaClient();

export const listComments = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<CommentDto[]> => {
  return prisma.comment.findMany({
    select: {
      id: true,
      text: true,
      userId: true,
      campaignId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { campaignId: campaignId },
    skip,
    take,
  });
};

export const createComment = async (
  comment: CreateCommentDto,
  uid: string,
): Promise<CommentDto> => {
  const campaign = await prisma.campaign.findFirst({
    select: {
      id: true,
      userId: true,
    },
    where: {
      id: comment.campaignId,
    },
  });

  const supporter = await prisma.contribution.findFirst({
    select: {
      userId: true,
    },
    where: {
      campaignId: comment.campaignId,
      userId: uid,
    },
  });

  const isAllowedToComment = campaign?.userId === uid || supporter;

  if (!isAllowedToComment) {
    throw new Error("Usuário precisa ser um apoiador ou o criador da campanha para comentar");
  }

  return await prisma.comment.create({
    select: {
      id: true,
      text: true,
      userId: true,
      campaignId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...comment,
      userId: uid,
    },
  });
};

export const deleteComment = async (id: string): Promise<CommentDto> => {
  return await prisma.comment.delete({ where: { id: id } });
};
