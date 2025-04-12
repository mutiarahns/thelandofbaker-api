import { z } from "@hono/zod-openapi";
import { CategorySchema } from "../category/schema";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  price: z.number().default(0),
  stock: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.string().nullable(),
  category: CategorySchema.nullable(),
});

export const ProductsSchema = z.array(ProductSchema);

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  categoryId: true,
  category: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slug: z.string().optional(),
  categorySlug: z.string().optional(),
});

export const CreateProductsSchema = z.array(CreateProductSchema);

export const UpdateProductSchema = CreateProductSchema.partial();
