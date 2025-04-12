import { z } from "@hono/zod-openapi";
import { CreateProductsSchema } from "../../src/modules/product/schema";

// TODO: Reupload images to Uploadcare

export const dataProducts: z.infer<typeof CreateProductsSchema> = [
  {
    name: "Putri Salju",
    slug: "putri-salju",
    description: "Putri salju",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    price: 75000,
    stock: 10,
    categorySlug: "cookies",
  },
  {
    name: "Nastar",
    slug: "nastar",
    description: "Nastar",
    imageUrl:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 120000,
    stock: 10,
    categorySlug: "cookies",
  },
  {
    name: "Lidah Kucing",
    slug: "lidah-kucing",
    description: "Lidah Kucing",
    imageUrl:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 50000,
    stock: 10,
    categorySlug: "cookies",
  },
  {
    name: "Sagu Keju",
    slug: "sagu-keju",
    description: "Putri salju",
    imageUrl:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 50000,
    stock: 10,
    categorySlug: "cookies",
  },
  {
    name: "Black Forest Cake",
    slug: "black-forest-cake",
    description: "Black Forest Cake",
    imageUrl: "https://example.com",
    price: 150000,
    stock: 10,
    categorySlug: "cakes",
  },
  {
    name: "Croissant",
    slug: "croissant",
    description: "Croissant",
    imageUrl: "https://example.com",
    price: 80000,
    stock: 10,
    categorySlug: "breads",
  },
  {
    name: "Eclair",
    slug: "eclair",
    description: "Eclair",
    imageUrl: "https://example.com",
    price: 100000,
    stock: 10,
    categorySlug: "pastry",
  },
  {
    name: "Chocolate Pudding",
    slug: "chocolate-pudding",
    description: "Chocolate Pudding",
    imageUrl: "https://example.com",
    price: 60000,
    stock: 10,
    categorySlug: "pudding",
  },
];
