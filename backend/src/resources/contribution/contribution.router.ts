import { Router } from "express";
import contributionController from "./contribution.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", contributionController.index);
router.get("/percentage/:campaignId", contributionController.readPercentage);
router.get("/supporters/:campaignId", contributionController.readTotalSupporters);
router.get("/allSupporters", contributionController.indexTotalSupporters);
router.get("/allSupporters/:campaignId", contributionController.indexSupporters);
router.post("/", isAuth, contributionController.create);
router.get("/:id", isAuth, contributionController.read);

export default router;
