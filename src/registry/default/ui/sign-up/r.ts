import { getComponentCode } from "@/lib/get-component-code";
import { codePreview, desc, title } from "@/types/docs";
import type Route from "@/types/route";
import MyComponent from "./component";

// This will only be used by the page, not by the registry script
export const route: Route = {
  title: "Sign Up",
  description: "My page description",
};

export const docs = async () => {
  const code = await getComponentCode("ui/sign-up/component");

  return [
    title(route.title),
    desc(route.description),
    codePreview("test", MyComponent, code, "tsx"),
  ];
};
