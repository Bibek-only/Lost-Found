import { Router } from "express";
import passport from "../configuration/passport.config";
import { googleAuthCallback } from "../controller/googleAuthCallback.controller";

const authRouter = Router();

authRouter.get(
  // must hit through frontend to open the goolge login screen
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  //after the loginwas done this end point was hit as call back url
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback,
);

export {authRouter};
