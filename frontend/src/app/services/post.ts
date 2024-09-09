import api from "./api";
import { Post, CreatePostDTO } from "../types/post";

export function getPosts(idCampaign: string): Promise<Post[]> {
  return api.get(`/post/${idCampaign}`).then((response) => response.data);
}

export function createPost(post: CreatePostDTO): Promise<Post> {
  return api.post("/post", post).then((response) => response.data);
}

export function removePost(idCampaign: string): Promise<Post> {
  return api.delete(`post/${idCampaign}`).then((response) => response.data);
}
