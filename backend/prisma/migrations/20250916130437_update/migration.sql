/*
  Warnings:

  - Added the required column `fileId` to the `ItemImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ItemImage" ADD COLUMN     "fileId" TEXT NOT NULL;
