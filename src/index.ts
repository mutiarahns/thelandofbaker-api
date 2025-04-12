import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { Scalar } from "@scalar/hono-api-reference";
import { productsRoute } from "./routes/products";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productsRoute);

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
