import api from "./api";
import { Comment } from "../types/comment";
import { CreateReportCampaignDTO } from "../types/report";

export function createReportComment(commentId: string): Promise<Comment> {
  return api.post("/reportComment", { commentId }).then((response) => response.data);
}

export function createReportCampaign(reportCampaign: CreateReportCampaignDTO): Promise<Comment> {
  return api.post("/reportCampaign", reportCampaign).then((response) => response.data);
}
