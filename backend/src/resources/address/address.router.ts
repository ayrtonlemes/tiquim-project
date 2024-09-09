import { Router } from "express";
import addressController from "./address.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", addressController.index);
router.post("/", isAuth, addressController.create);
router.delete("/", isAuth, addressController.remove);
router.get("/:id", isAuth, addressController.read)
export default router;
