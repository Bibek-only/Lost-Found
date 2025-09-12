import { Router, Request, Response } from "express";
import ApiResponse from "../utils/apiResponse";
const healthRouter = Router();

healthRouter.route("/").get((req: Request | any, res: Response | any) => {
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "Everything is working fine", null, null));
});

export  {healthRouter}