import { Router } from "express";
import rewardController from "./reward.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", rewardController.index);
router.post("/", isAuth, rewardController.create);
router.get("/:id", rewardController.read);
router.put("/:id", isAuth, rewardController.update);
router.delete("/:id", isAuth, rewardController.remove);

export default router;
