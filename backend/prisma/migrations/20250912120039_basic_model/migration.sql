-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('ADMIN', 'NORMAL');

-- CreateEnum
CREATE TYPE "public"."CampusRole" AS ENUM ('STUDENT', 'TEACHER', 'FACULTY', 'STAFF', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."UserState" AS ENUM ('LOST', 'FOUND', 'NONE');

-- CreateEnum
CREATE TYPE "public"."CurrentYear" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- CreateEnum
CREATE TYPE "public"."Designation" AS ENUM ('PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR', 'LECTURER', 'HOD', 'PRINCIPAL', 'LAB_ASSISTANT', 'LIBRARIAN', 'ADMINISTRATIVE_STAFF', 'CLERK', 'SECURITY', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."JobTitle" AS ENUM ('LAB_TECHNICIAN', 'OFFICE_ASSISTANT', 'LIBRARY_ASSISTANT', 'ACCOUNTANT', 'DRIVER', 'PEON', 'CLEANER', 'SECURITY_GUARD', 'ELECTRICIAN', 'PLUMBER', 'GARDENER', 'MAINTENANCE_WORKER', 'IT_SUPPORT', 'HOSTEL_WARDEN', 'CANTEEN_STAFF', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ListingType" AS ENUM ('LOST', 'FOUND');

-- CreateEnum
CREATE TYPE "public"."ListingStatus" AS ENUM ('ACTIVE', 'RESOLVED', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "profileImage" TEXT,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT,
    "userType" "public"."UserType" NOT NULL DEFAULT 'NORMAL',
    "campusRole" "public"."CampusRole" NOT NULL DEFAULT 'STUDENT',
    "userState" "public"."UserState" NOT NULL DEFAULT 'NONE',
    "branch" TEXT,
    "academicYear" TEXT,
    "section" TEXT,
    "currentYear" "public"."CurrentYear",
    "designation" "public"."Designation",
    "department" TEXT,
    "jobTitle" "public"."JobTitle",
    "staffDept" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "district" TEXT,
    "city" TEXT,
    "pin" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Listing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "keywords" TEXT[],
    "listingType" "public"."ListingType" NOT NULL,
    "status" "public"."ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "landmark" TEXT,
    "lostOrFoundAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ItemImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "listingId" INTEGER NOT NULL,

    CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "public"."Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "public"."Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_id_key" ON "public"."Listing"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemImage_id_key" ON "public"."ItemImage"("id");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemImage" ADD CONSTRAINT "ItemImage_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
