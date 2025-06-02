import { db } from "@/lib/prisma";
import { cache } from "../../lib/cache";

export const getCategories = cache(
  () => {
    const categories = db.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);
