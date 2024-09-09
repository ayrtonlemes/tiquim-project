import { Router } from "express";
import creditCardController from "./creditCard.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.post("/", creditCardController.create);
router.get("/:id", isAuth, creditCardController.read);
router.put("/:id", creditCardController.update);
router.delete("/:id", creditCardController.remove);

export default router;
