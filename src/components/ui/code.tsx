import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import {
  evilRabbitDarkTheme,
  evilRabbitLightTheme,
} from "@/components/ui/code-theme";
import { cn } from "@/lib/utils";

interface CodeBlockHtmlProps {
  code: string;
  language: BundledLanguage;
  heightAuto?: boolean;
}

export default async function Code({
  code,
  language,
  heightAuto = true,
}: CodeBlockHtmlProps) {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: evilRabbitLightTheme as any,
      dark: evilRabbitDarkTheme as any,
    },
    defaultColor: false,
  });

  return (
    <div
      className={cn(
        "no-scroll-bar px-3 [&_code]:font-mono [&_code]:text-sm [&_pre]:overflow-auto [&_pre]:leading-snug",
        heightAuto ? "h-auto" : "h-[calc(100svh-260px)]",
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <Shiki>
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
