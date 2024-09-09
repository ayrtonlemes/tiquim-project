import { Request, Response } from "express";
import { CreateReportCampaignDto } from "./reportCampaign.types";
import {
  createReportCampaign,
  deleteAllReportCampaigns,
  deleteReportCampaign,
  listReportCampaigns,
} from "./reportCampaign.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
  const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
  try {
    const comments = await listReportCampaigns(campaignId, skip, take);
    res.status(StatusCodes.OK).json(comments);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const comment = req.body as CreateReportCampaignDto;
  const uid = req.session.uid!;
  try {
    const newReport = await createReportCampaign(comment, uid);
    res.status(StatusCodes.OK).json(newReport);
  } catch (err: any) {
    console.log(err);
    if (err.message === "Só é possível denunciar uma vez") {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { reportCampaignId } = req.params;
  try {
    await deleteReportCampaign(reportCampaignId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const removeAll = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    await deleteAllReportCampaigns(commentId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, remove, removeAll };
