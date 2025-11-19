// Component are picked from
// https://github.com/legions-developer/evilcharts/ and adapted to this project

"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface MenuItem {
  name: string;
  title: string;
  url: string;
}

export default function DocsMenuItems({ items }: { items: MenuItem[] }) {
  const pathname = usePathname();

  return items.map((item) => (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton
        isActive={pathname === item.url}
        className={cn(
          "border border-transparent",
          pathname === item.url &&
            "shadow-[inset_0px_0px_0px_1px_#fff] dark:shadow-[inset_0px_0px_0px_1px_#000] border",
        )}
        asChild
      >
        <Link href={item.url}>
          <span className="ml-2">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
}
