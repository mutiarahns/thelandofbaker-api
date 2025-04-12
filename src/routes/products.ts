import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  CreateProductSchema,
  ProductSchema,
  ProductsSchema,
  UpdateProductSchema,
} from "../modules/product/schema";
import { prisma } from "../utils/prisma";
import { createNewSlug } from "../utils/slugify";
import { Prisma } from "../generated/prisma";

export const productsRoute = new OpenAPIHono();

const tags = ["Products"];

// GET all products
productsRoute.openapi(
  createRoute({
    tags,
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
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return c.json(products);
  }
);

// GET a product by id
productsRoute.openapi(
  createRoute({
    tags,
    method: "get",
    path: "/:identifier",
    request: { params: z.object({ identifier: z.string() }) },
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get a product by identifier (id or slug)",
      },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    const { identifier } = c.req.valid("param");

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: { category: true },
    });

    if (!product) return c.notFound();

    return c.json(product);
  }
);

// POST new product
productsRoute.openapi(
  createRoute({
    tags,
    method: "post",
    path: "/",
    request: {
      body: {
        content: { "application/json": { schema: CreateProductSchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Product created successfully",
      },
      400: { description: "Create product failed" },
    },
  }),
  async (c) => {
    try {
      const json = c.req.valid("json");

      const { categorySlug, ...body } = json;

      const product = await prisma.product.create({
        data: {
          ...body,
          slug: createNewSlug(body.name),
          category: { connect: { slug: categorySlug } },
        },
        include: { category: true },
      });

      return c.json(product, 200);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error?.meta?.target as string[];
        if (error?.code === "P2002" && target.includes("slug")) {
          return c.json(
            { message: "Product with this slug or name already exists" },
            400
          );
        }
      }
      return c.json({ message: "Failed to create product", error }, 400);
    }
  }
);

// DELETE a product by id
productsRoute.openapi(
  createRoute({
    tags,
    method: "delete",
    path: "/:id",
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: { description: "Product deleted successfully" },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");

      const deletedProduct = await prisma.product.delete({
        where: { id },
        include: { category: true },
      });

      return c.json(deletedProduct, 200);
    } catch (error) {
      return c.notFound();
    }
  }
);

// Update a product by id, create if not exists
productsRoute.openapi(
  createRoute({
    tags,
    method: "patch",
    path: "/:id",
    request: {
      params: z.object({ id: z.string() }),
      body: {
        content: { "application/json": { schema: UpdateProductSchema } },
      },
    },
    responses: {
      200: { description: "Product updated successfully" },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");

      const updatedProduct = await prisma.product.update({
        data: {
          ...body,
          slug: body.name ? createNewSlug(body.name) : undefined,
          category: body.categorySlug
            ? { connect: { slug: body.categorySlug } }
            : undefined,
        },
        where: { id },
        include: { category: true },
      });

      return c.json(updatedProduct, 200);
    } catch (error) {
      return c.notFound();
    }
  }
);
