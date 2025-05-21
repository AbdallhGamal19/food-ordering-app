import { Prisma } from "@prisma/client";

export type productWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;
