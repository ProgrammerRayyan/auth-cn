import Link from "next/link";
import { SidebarHeader } from "@/components/ui/sidebar";

const DocsSidebarHeader = () => {
  return (
    <SidebarHeader className="border-b border-dashed h-14 justify-center px-2 overflow-hidden">
      <div className="flex items-baseline gap-2 px-2 whitespace-nowrap">
        <Link
          href="/"
          className="font-doto text-2xl font-black tracking-tighter"
        >
          Auth CN
        </Link>
        <Link
          href="https://better-auth.com"
          target="_blank"
          className="text-sm font-mono text-muted-foreground font-light hover:text-primary duration-100"
        >
          for Better Auth
        </Link>
      </div>
    </SidebarHeader>
  );
};

export default DocsSidebarHeader;
