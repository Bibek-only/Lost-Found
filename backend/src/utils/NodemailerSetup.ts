import { validENV } from "../schemas/envSchema";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: validENV.GMAIL,
    pass: validENV.APP_PASSWORD,
  },
});
