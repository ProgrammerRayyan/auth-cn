import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/registry/default/database/mysql/auth";

export const { POST, GET } = toNextJsHandler(auth);
