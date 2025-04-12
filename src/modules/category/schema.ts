import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const CreateCategoriesSchema = z.array(CategorySchema);
