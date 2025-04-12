import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  CreateProductSchema,
  ProductSchema,
  ProductsSchema,
  UpdateProductSchema,
} from "../modules/product/schema";
import { prisma } from "../utils/prisma";
import { createNewSlug } from "../utils/slugify";

export const productsRoute = new OpenAPIHono();

// GET all products
productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();

    return c.json(products);
  }
);

// GET a product by id
productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/:id",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get a product by id",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const id = c.req.param("id");
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return c.notFound();
    }

    return c.json(product);
  }
);

// POST new product
productsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateProductSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Product created successfully",
      },
    },
  }),
  async (c) => {
    const data = await c.req.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        slug: createNewSlug(data.name),
      },
    });
    return c.json(product, 200);
  }
);

// DELETE a product by id
productsRoute.openapi(
  createRoute({
    method: "delete",
    path: "/:id",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        description: "Product deleted successfully",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const id = c.req.param("id");

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return c.notFound();
    }

    await prisma.product.delete({
      where: { id },
    });

    return c.json({ message: "Product deleted successfully", product }, 200);
  }
);

// Update a product by id, create if not exists
productsRoute.openapi(
  createRoute({
    method: "patch",
    path: "/:id",
    request: {
      params: z.object({
        id: z.string(),
      }),
      body: {
        content: {
          "application/json": {
            schema: UpdateProductSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Product updated successfully",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const id = c.req.param("id");
    const updatedProduct = await c.req.json();

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Product not found.",
        },
        404
      );
    }

    const data = await prisma.product.update({
      data: {
        ...updatedProduct,
        slug: updatedProduct.name
          ? createNewSlug(updatedProduct.name)
          : product.slug,
      },
      where: { id },
    });

    return c.json({ message: "Product updated successfully", data }, 200);
  }
);
