import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string(),
  price: z.number().default(0),
  stock: z.number().default(0),
  categoryId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slug: z.string().optional(),
  categoryId: z.string().optional(),
});

export const CreateProductsSchema = z.array(CreateProductSchema);

export const UpdateProductSchema = CreateProductSchema.partial();
