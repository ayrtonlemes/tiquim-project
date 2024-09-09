import { Router } from "express";
import reportCommentController from "./reportComment.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/:campaignId", isAdmin, reportCommentController.index);
router.post("/", isAuth, reportCommentController.create);
router.delete("/one/:reportCommentId", isAdmin, reportCommentController.remove);
router.delete("/all/:reportCommentId", isAdmin, reportCommentController.removeAll);

export default router;
