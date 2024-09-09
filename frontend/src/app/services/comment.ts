import api from "./api";
import { Comment, CreateCommentDTO } from "../types/comment";

export function getComments(idCampaign: string): Promise<Comment[]> {
  return api.get(`/comment/${idCampaign}`).then((response) => response.data);
}

export function createComment(comment: CreateCommentDTO): Promise<Comment> {
  return api.post("/comment", comment).then((response) => response.data);
}
