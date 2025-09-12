import 'dotenv/config'
import express from "express";
import cors from "cors";
import { healthRouter } from "./router/healthRouter";
const app = express();

//middlewares
app.use(express.json()); //middleware to parse/access the body
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

//rotuer configuration
app.use("/health", healthRouter);


export default app;
