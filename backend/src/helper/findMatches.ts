import { sendEmail } from "./SendEmail";

export const findMatches = async (newListing: any, tx: any) => {
  const oppositeType = newListing.listingType === "LOST" ? "FOUND" : "LOST";

  const candidates = await tx.listing.findMany({
    where: { listingType: oppositeType, isDeleted: false },
    include: { user: true ,
        images: true
    },
  });

  const matches = candidates
    .filter((c: any) =>
      c.keywords.some((k: any) => newListing.keywords.includes(k)),
    )
    .map((c: any) => ({
      lostId: newListing.listingType === "LOST" ? newListing.id : c.id,
      foundId: newListing.listingType === "FOUND" ? newListing.id : c.id,
      otherEmail: c.user.email,
      listerName: c.user.fullName ?? "Unknown",
      listerEmail: c.user.email ?? "unknow",
      description: c.description,
      keywords: c.keywords,
      productImageUrl: c.itemImages?.[0]?.imageUrl ?? null,
    }));

  for (const match of matches) {
    const exists = await tx.matchRecord.findFirst({
      where: { lostId: match.lostId, foundId: match.foundId },
    });
    if (!exists) {
      await tx.matchRecord.create({
        data: {
          lostId: match.lostId,
          foundId: match.foundId,
        },
      });
      // sendMail(...) here
      await sendEmail({
        to: match.otherEmail,
        subject:
          newListing.listingType === "LOST"
            ? "Someone may have found your lost item"
            : "Someone may have lost an item you found",
        listerName: match.listerName,
        listerEmail: match.listerEmail,
        description: match.description,
        keywords: match.keywords,
        productImageUrl: match.productImageUrl,
      });
    }
  }
};
