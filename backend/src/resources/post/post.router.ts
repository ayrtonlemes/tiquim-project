import { Router } from "express";
import postController from "./post.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/:campaignId", postController.index);
router.post("/", isAuth, postController.create);
router.delete("/:postId", postController.remove);

export default router;
