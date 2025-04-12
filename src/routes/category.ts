import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  CategorySchema,
  CreateCategoriesSchema,
} from "../modules/category/schema";
import { prisma } from "../utils/prisma";
import { createNewSlug } from "../utils/slugify";
import { Prisma } from "../generated/prisma";

export const categoryRoute = new OpenAPIHono();

const tags = ["Categories"];

// GET all categories
categoryRoute.openapi(
  createRoute({
    tags,
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: CreateCategoriesSchema } },
        description: "Get all categories",
      },
    },
  }),
  async (c) => {
    const categories = await prisma.category.findMany();
    return c.json(categories);
  }
);

// GET a category by id or slug
categoryRoute.openapi(
  createRoute({
    tags,
    method: "get",
    path: "/:identifier",
    request: { params: z.object({ identifier: z.string() }) },
    responses: {
      200: {
        content: { "application/json": { schema: CategorySchema } },
        description: "Get a category by identifier (id or slug)",
      },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    const { identifier } = c.req.valid("param");

    const category = await prisma.category.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
    });

    if (!category) return c.notFound();

    return c.json(category);
  }
);

// POST new category
categoryRoute.openapi(
  createRoute({
    tags,
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CategorySchema.omit({ id: true }),
          },
        },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: CategorySchema } },
        description: "Category created successfully",
      },
      400: { description: "Create category failed" },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const category = await prisma.category.create({
        data: {
          ...body,
          slug: createNewSlug(body.name),
        },
      });

      return c.json(category, 200);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error?.meta?.target as string[];
        if (error?.code === "P2002" && target.includes("slug")) {
          return c.json(
            { message: "Category with this slug or name already exists" },
            400
          );
        }
      }
      return c.json({ message: "Failed to create category", error }, 400);
    }
  }
);

// DELETE a category by id
categoryRoute.openapi(
  createRoute({
    tags,
    method: "delete",
    path: "/:id",
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: { description: "Category deleted successfully" },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");

      const deletedCategory = await prisma.category.delete({
        where: { id },
      });

      return c.json(deletedCategory, 200);
    } catch (error) {
      return c.notFound();
    }
  }
);

// Update a category by id
categoryRoute.openapi(
  createRoute({
    tags,
    method: "patch",
    path: "/:id",
    request: {
      params: z.object({ id: z.string() }),
      body: {
        content: {
          "application/json": {
            schema: CategorySchema.omit({ id: true }).partial(),
          },
        },
      },
    },
    responses: {
      200: { description: "Category updated successfully" },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");

      const updatedCategory = await prisma.category.update({
        data: {
          ...body,
          slug: body.name ? createNewSlug(body.name) : undefined,
        },
        where: { id },
      });

      return c.json(updatedCategory, 200);
    } catch (error) {
      return c.notFound();
    }
  }
);
