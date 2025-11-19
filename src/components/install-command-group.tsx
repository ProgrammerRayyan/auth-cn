"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PACKAGE_MANAGERS = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
} as const;

type PackageManager = keyof typeof PACKAGE_MANAGERS;

const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    aria-label="copy-icon"
    height={size}
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    style={{ transform: "scaleX(-1)" }}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="none" height="14" rx="2" ry="2" width="14" x="8" y="8" />
    <path
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      fill="none"
    />
  </svg>
);

interface InstallCommandGroupProps {
  componentName: string;
}

export function InstallCommandGroup({
  componentName,
}: InstallCommandGroupProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const getCommand = () => {
    const commands: Record<PackageManager, string> = {
      npm: `npx shadcn@latest add @auth-cn/${componentName}`,
      pnpm: `pnpm dlx shadcn@latest add @auth-cn/${componentName}`,
      yarn: `yarn shadcn@latest add @auth-cn/${componentName}`,
      bun: `bunx --bun shadcn@latest add @auth-cn/${componentName}`,
    };
    return commands[packageManager];
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    } catch (_error) {
      // Silently fail
    }
  };

  return (
    <ButtonGroup className="w-full sm:w-auto">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <span className="hidden xs:inline">{packageManager}</span>
                <span className="inline xs:hidden">
                  {packageManager.slice(0, 3)}
                </span>
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Select package manager</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup
            value={packageManager}
            onValueChange={(value) =>
              setPackageManager(value as PackageManager)
            }
          >
            {Object.values(PACKAGE_MANAGERS).map((pm) => (
              <DropdownMenuRadioItem key={pm} value={pm}>
                {pm}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ButtonGroupSeparator />

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="flex-1 sm:flex-none sm:w-[280px] md:w-[320px] justify-between gap-2 font-mono text-sm xs:text-xs transition-all min-w-0"
        aria-label={copied ? "Copied to clipboard" : "Copy install command"}
      >
        <span className="truncate">{getCommand()}</span>
        <div className="shrink-0">
          {copied ? <Check className="size-3.5" /> : <CopyIcon size={14} />}
        </div>
      </Button>
    </ButtonGroup>
  );
}
