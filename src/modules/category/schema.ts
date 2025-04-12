import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const SeedCategorySchema = CategorySchema.omit({
  id: true,
});

export const SeedCategoriesSchema = z.array(SeedCategorySchema);

export const CreateCategoriesSchema = z.array(CategorySchema);
