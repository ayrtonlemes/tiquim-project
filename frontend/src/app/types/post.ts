export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  campaignId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePostDTO = Pick<Post, "campaignId" | "title" | "description">;
