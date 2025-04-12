import { z } from "@hono/zod-openapi";
import { CreateCategoriesSchema } from "../../src/modules/category/schema";

export const dataCategory: z.infer<typeof CreateCategoriesSchema> = [
  {
    id: "1",
    name: "Cookies",
    description: "Cookies",
  },
  {
    id: "2",
    name: "Cakes",
    description: "Cakes",
  },
  {
    id: "3",
    name: "Breads",
    description: "Breads",
  },
  {
    id: "4",
    name: "Pastry",
    description: "Pastry",
  },
  {
    id: "5",
    name: "Pudding",
    description: "Pudding",
  },
];
