import { validENV } from "../schemas/envSchema";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateUser } from "../service/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: validENV.GOOGLE_CLIENT_ID,
      clientSecret: validENV.GOOGLE_CLIENT_SECREATE,
      callbackURL: validENV.GOOGLE_CALLBACK_URL_DEV, // this callback url is the exact url given in the google console it need to hited after successful loging
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile); // this will hit after the goolgle login screen was open and by selecting an google account
        if (user) {
          return done(null, user);
        } else {
          return done(Error, undefined);
        }
      } catch (error) {
        return done(error as Error, undefined);
      }
    },
  ),
);

export default passport;
