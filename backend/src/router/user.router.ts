import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { updateProfile } from "../controller/updateProfile.controller";
const userRouter = Router();
userRouter.route("/update-profile").post(authMiddleware,updateProfile);
export {userRouter}