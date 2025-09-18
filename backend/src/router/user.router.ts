import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { updateProfile } from "../controller/updateProfile.controller.js";
import { getUserInfo } from "../controller/getUserInfo.controller.js";
import { getAuthStatus } from "../controller/authStatus.controller.js";
import { portalEntry } from "../controller/portalEntry.controller.js";
import {getAllListedItems} from "../controller/getAllListingItem.controller.js"
const userRouter = Router();
userRouter.route("/update-profile").post(authMiddleware, updateProfile);
userRouter.route("/get-info").get(authMiddleware, getUserInfo);
userRouter.route("/auth/status").get(authMiddleware, getAuthStatus);
userRouter.route("/portal-entry").post(authMiddleware, portalEntry);
userRouter.route("/get-all-listing").get(authMiddleware,getAllListedItems)
export { userRouter };
