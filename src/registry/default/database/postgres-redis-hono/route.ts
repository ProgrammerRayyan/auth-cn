import { Hono } from "hono";
import { auth } from "@/registry/default/database/postgres-redis-hono/auth";

const authRoutes = new Hono();

authRoutes.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRoutes;
