-- CreateTable
CREATE TABLE "public"."MatchRecord" (
    "id" SERIAL NOT NULL,
    "lostId" INTEGER NOT NULL,
    "foundId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MatchRecord" ADD CONSTRAINT "MatchRecord_lostId_fkey" FOREIGN KEY ("lostId") REFERENCES "public"."Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MatchRecord" ADD CONSTRAINT "MatchRecord_foundId_fkey" FOREIGN KEY ("foundId") REFERENCES "public"."Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
