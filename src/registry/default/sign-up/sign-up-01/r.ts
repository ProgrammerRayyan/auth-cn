import { getComponentCode } from "@/lib/get-component-code";
import { codePreview, desc, links, title } from "@/types/docs";
import type { RegistryItem } from "@/types/registry";
import SignUpComponent from "./component";

export const item: RegistryItem = {
  name: "sign-up-01",
  type: "registry:block",
  title: "Sign up 01",
  description: "A setup for Better Auth with a simple Tailark sign-up",
  files: [
    {
      path: "sign-up.tsx",
      type: "registry:component",
    },
  ],
  dependencies: ["lucide-react"],
  registryDependencies: ["button", "input", "label", "spinner", "sonner"],
  docs: "You need to have Better Auth set up to use this login component. Visit better-auth.com for more information.",
};

export const docs = async () => {
  const signUpCode = await getComponentCode("sign-up/sign-up-01/sign-up");

  return [
    title(item.title as string),
    desc(item.description as string),
    links(["Tailark", "https://tailark.com/sign-up"]),
    codePreview(item.name as string, SignUpComponent, signUpCode, "tsx"),
  ];
};
