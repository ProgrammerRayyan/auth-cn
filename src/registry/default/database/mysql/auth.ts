import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
  database: createPool(process.env.DATABASE_URL as string),
  emailAndPassword: {
    enabled: true,
  },
});
