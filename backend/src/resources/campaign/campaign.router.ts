import { Router } from "express";
import campaignController from "./campaign.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "..", "uploads", "campaigns");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", campaignController.index);
router.get("/region/", isAuth, campaignController.indexRegion);
router.put("/close/:id", isAdmin, campaignController.close);
router.get("/user", campaignController.indexUser);
router.post("/", isAuth, upload.single("campaignImage"), campaignController.create);
router.get("/:id", campaignController.read);
router.put("/:id", isAuth, upload.single("campaignImage"), campaignController.update);
router.delete("/:id", isAuth, campaignController.remove);

export default router;
