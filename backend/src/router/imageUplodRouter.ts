import { Router } from "express";
import imageUpload from "../controller/uploadImage.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const imageRouter = Router();
imageRouter.route("/upload").post(
  authMiddleware,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  imageUpload,
);

export { imageRouter };
