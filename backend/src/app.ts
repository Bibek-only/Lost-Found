import express from "express";
import cors from "cors";
import { healthRouter } from "./router/healthRouter";
const app = express();

//middlewares
app.use(express.json()); //middleware to parse/access the body
app.use(cors({
    origin: ["http://localhost:5173"]
}))

//rotuer configuration
app.use("/health",healthRouter);


app.get("/",(req:any, res:any)=>{
    res.status(200).json({
        success: true, 
        msg:"Everthing is fine and the site is working successfully"
    });
});

export default app;