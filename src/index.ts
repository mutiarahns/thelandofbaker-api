import { cors } from "hono/cors";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { Scalar } from "@scalar/hono-api-reference";

import { ProductsSchema } from "./modules/product/schema";

const app = new OpenAPIHono();

app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
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

// The OpenAPI documentation will be available at /doc
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "The Land of Baker API",
    version: "1.0.0",
  },
});

app.get("/swagger", swaggerUI({ url: "/openapi.json" }));
app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
