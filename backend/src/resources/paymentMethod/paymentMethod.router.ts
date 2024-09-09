import { Router } from "express";
import paymentMethodController from "./paymentMethod.controller";
import { isAuth } from "../../middlewares/isAdmin";
const router = Router();

router.get("/", isAuth, paymentMethodController.index);
router.post("/", isAuth, paymentMethodController.create);
router.get("/:id", isAuth, paymentMethodController.read);
router.put("/:id", isAuth, paymentMethodController.update);
router.delete("/:id", isAuth, paymentMethodController.remove);

export default router;
