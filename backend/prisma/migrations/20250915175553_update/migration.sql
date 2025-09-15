/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - The `campusRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `designation` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `jobTitle` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "country" SET DEFAULT 'India';

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "description",
ADD COLUMN     "other" TEXT,
DROP COLUMN "campusRole",
ADD COLUMN     "campusRole" TEXT NOT NULL DEFAULT 'Student',
DROP COLUMN "designation",
ADD COLUMN     "designation" TEXT,
DROP COLUMN "jobTitle",
ADD COLUMN     "jobTitle" TEXT;

-- DropEnum
DROP TYPE "public"."CampusRole";

-- DropEnum
DROP TYPE "public"."Designation";

-- DropEnum
DROP TYPE "public"."JobTitle";
