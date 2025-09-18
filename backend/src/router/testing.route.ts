import { Router } from "express";
import { testSignin } from "../controller/testingSignup.controller";
const testingRouter = Router();
testingRouter.route("/signin").post(testSignin);
export { testingRouter };
