export interface Comment {
  id: string;
  text: string;
  userId: string;
  campaignId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCommentDTO = Pick<Comment, "campaignId" | "text">;
