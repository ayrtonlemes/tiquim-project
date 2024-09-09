import { Comment } from "@prisma/client";

export type CreateCommentDto = Pick<Comment, "text" | "campaignId">;

export type CommentDto = Comment;
