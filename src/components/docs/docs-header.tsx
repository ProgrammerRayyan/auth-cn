// Component are picked from
// https://github.com/legions-developer/evilcharts/ and adapted to this project

import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "../theme-toggle";

const DocsHeader = () => {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-dashed px-4 sticky top-0 bg-background z-50">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm" asChild>
          <Link href="https://github.com/MrUprizing/auth-cn" target="_blank">
            Star on GitHub
            <GithubIcon size={10} />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default DocsHeader;
