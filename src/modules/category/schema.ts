import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullable(),
});

export const SeedCategorySchema = CategorySchema.omit({
  id: true,
});

export const SeedCategoriesSchema = z.array(SeedCategorySchema);

export const CreateCategoriesSchema = z.array(CategorySchema);
