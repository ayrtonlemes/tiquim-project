import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { reportCommentDto, CreateReportCommentDto } from "./reportComment.types";

const prisma = new PrismaClient();

export const listReportComments = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<reportCommentDto[]> => {
  return prisma.reportComment.findMany({
    select: {
      id: true,
      commentId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { commentId: campaignId },
    skip,
    take,
  });
};

export const createReportComment = async (
  commentReport: CreateReportCommentDto,
  uid: string,
): Promise<reportCommentDto> => {
  const comment = await prisma.comment.findUnique({
    select: {
      id: true,
    },
    where: {
      id: commentReport.commentId,
    },
  });

  if (!comment) {
    throw new Error("O Comentário à ser denunciado não existe");
  }

  const alreadyReported = await prisma.reportComment.findFirst({
    select: { id: true },
    where: { commentId: comment.id, userId: uid },
  });

  if (alreadyReported) {
    throw new Error("Só é possível denunciar uma vez");
  }

  return await prisma.reportComment.create({
    select: {
      id: true,
      commentId: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...commentReport,
      userId: uid,
    },
  });
};

export const deleteReportComment = async (id: string): Promise<reportCommentDto> => {
  return await prisma.reportComment.delete({ where: { id: id } });
};

export const deleteAllReportComments = async (commentId: string): Promise<void> => {
  await prisma.reportComment.deleteMany({ where: { commentId: commentId } });
};
