import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("The land of baker API");
});

export default app;
