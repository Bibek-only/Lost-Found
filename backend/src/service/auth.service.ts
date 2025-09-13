import prisma from "../db/prismaClient";
import { Profile } from "passport-google-oauth20";

export async function findOrCreateUser(profile: Profile) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: profile.emails?.[0]?.value },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName: profile.displayName,
          email: profile.emails?.[0]?.value!,
          profileImage: profile.photos?.[0]?.value,
        },
      });
    }
    return user;
  } catch (error) {
    console.log("Error occured in the auth.service.ts", error);
    return undefined;
  }
}
