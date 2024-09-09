import { Router } from "express";
import reportCampaignController from "./reportCampaign.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.post("/", isAuth, reportCampaignController.create);
router.delete("/one/:reportCampaignId", isAdmin, reportCampaignController.remove);
router.delete("/all/:campaignId", isAdmin, reportCampaignController.removeAll);
router.get("/:campaignId", isAdmin, reportCampaignController.index);

export default router;
