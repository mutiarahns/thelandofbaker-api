import { z } from "@hono/zod-openapi";
import { CategorySchema } from "../category/schema";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullable(),
  imageUrl: z
    .string()
    .nullable()
    .default("https://sureketo.com/images/coconut-bread.jpg"),
  price: z.number().min(0).default(0),
  stock: z.number().min(0).default(0),
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
