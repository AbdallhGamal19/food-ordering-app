import { db } from "@/lib/prisma";
import { cache } from "../../lib/cach";

export const getBestSellers = cache(
  async (limit?: number | undefined) => {
    const bestSellers = await db.product.findMany({
      include: {
        sizes: true,
        extras: true,
      },
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      take: limit,
    });
    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600 }
);
export const getProductsByCategory = cache(
  async () => {
    const products = await db.category.findMany({
      // Added 'await'
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });

    return products;
  },
  ["products"],
  { revalidate: 3600 }
);
