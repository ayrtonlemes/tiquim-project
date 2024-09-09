import { Post } from "@prisma/client";

export type CreatePostDto = Pick<Post, "title" | "description" | "campaignId">;

export type PostDto = Post;
