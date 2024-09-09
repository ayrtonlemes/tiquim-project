import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { PostDto, CreatePostDto } from "./post.types";

const prisma = new PrismaClient();

export const listPosts = async (
  campaignId: string,
  skip?: number,
  take?: number,
): Promise<PostDto[]> => {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
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

export const createPost = async (post: CreatePostDto, uid: string): Promise<PostDto> => {
  const campaign = await prisma.campaign.findFirst({
    select: {
      id: true,
      userId: true,
    },
    where: {
      id: post.campaignId,
      userId: uid,
    },
  });

  if (!campaign) {
    throw new Error("Usuário precisa ser o criador para criar posts");
  }

  return await prisma.post.create({
    select: {
      id: true,
      title: true,
      description: true,
      userId: true,
      campaignId: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...post,
      userId: uid,
    },
  });
};

export const deletePost = async (postId: string, uid: string): Promise<PostDto> => {
  return await prisma.post.delete({ where: { id: postId, userId: uid } });
};
