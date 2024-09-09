import { Router } from "express";
import authController from "./auth.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", isAuth, authController.logout);
router.post("/logged", authController.logged);

export default router;
