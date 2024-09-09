import { Router } from "express";
import userController from "./user.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "..", "uploads", "users");
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

router.get("/", userController.index);
router.post("/", upload.single("avatarImage"), userController.create);
router.post("/admin", isAdmin, upload.single("avatarImage"), userController.createAdmin);
router.get("/:id", userController.read);
router.get("/check/:email", userController.checkAvailableEmail);
router.put("/:id", upload.single("avatarImage"), isAuth, userController.update);
router.delete("/:id", isAdmin, userController.remove);

export default router;
