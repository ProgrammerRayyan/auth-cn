import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});
await redis.connect();

export const auth = betterAuth({
  database: createPool(process.env.DATABASE_URL as string),
  emailAndPassword: {
    enabled: true,
  },
  secondaryStorage: {
    get: async (key) => {
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      // TTL in seconds — convert ms with ttl * 1000.
      if (ttl) await redis.set(key, value, { EX: ttl });
      // or for ioredis:
      // if (ttl) await redis.set(key, value, 'EX', ttl)
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
});
