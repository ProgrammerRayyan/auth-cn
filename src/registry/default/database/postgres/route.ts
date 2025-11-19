import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/registry/default/database/postgres/auth";

export const { POST, GET } = toNextJsHandler(auth);
