import { getComponentCode } from "@/lib/get-component-code";
import { codePreview, desc, links, title } from "@/types/docs";
import type Route from "@/types/route";
import SignInComponent from "./component";

export const route: Route = {
  title: "Login",
  description: "A setup for Better Auth with a simple Tailark sign-in",
};

export const docs = async () => {
  const signUpCode = await getComponentCode("ui/login/sign-in");

  return [
    title(route.title as string),
    desc(route.description as string),
    links(["Tailark", "https://tailark.com/sign-in"]),
    codePreview("login-01", SignInComponent, signUpCode, "tsx"),
  ];
};
