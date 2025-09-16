import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { updateProfile } from "../controller/updateProfile.controller.js";
import {getUserInfo} from "../controller/getUserInfo.controller.js"
import {getAuthStatus} from "../controller/authStatus.controller.js"
const userRouter = Router();
userRouter.route("/update-profile").post(authMiddleware,updateProfile);
userRouter.route("/get-info").post(authMiddleware,getUserInfo);
userRouter.route("/auth/status").get(authMiddleware,getAuthStatus);
export {userRouter}