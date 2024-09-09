import { Router } from "express";
import commentController from "./comment.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/:campaignId", commentController.index);
router.post("/", isAuth, commentController.create);
router.delete("/:commentId", isAdmin, commentController.remove);

export default router;
