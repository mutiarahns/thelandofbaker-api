import { z } from "@hono/zod-openapi";
import { SeedCategoriesSchema } from "../../src/modules/category/schema";

export const dataCategories: z.infer<typeof SeedCategoriesSchema> = [
  {
    slug: "cookies",
    name: "Cookies",
    description: "Cookies",
  },
  {
    slug: "cakes",
    name: "Cakes",
    description: "Cakes",
  },
  {
    slug: "breads",
    name: "Breads",
    description: "Breads",
  },
  {
    slug: "pastry",
    name: "Pastry",
    description: "Pastry",
  },
  {
    slug: "pudding",
    name: "Pudding",
    description: "Pudding",
  },
];
