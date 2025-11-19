import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    //Conections options
    connectionString: process.env.DATABASE_URL as string,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
