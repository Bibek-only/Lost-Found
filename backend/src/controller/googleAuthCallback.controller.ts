import { validENV } from "../schemas/envSchema";
import jwt from "jsonwebtoken";
const googleAuthCallback = (req: any, res: any) => {
  // this is the end point of the google login

  const jwtToken = jwt.sign(
    {
      //create the cookie
      id: req.user.id,
      email: req.user.email,
    },
    validENV.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", `Bearer ${jwtToken}`, {
    //set the cookie in the frontend
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.redirect(`${validENV.FRONTEND_URL_DEV}/`); //after successfyll setthe cookie send the user to frontend url
};

export{googleAuthCallback};
