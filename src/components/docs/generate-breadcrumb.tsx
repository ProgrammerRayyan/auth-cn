// Component are picked from
// https://github.com/legions-developer/evilcharts/ and adapted to this project

"use client";

import { SlashIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { IconBookmark } from "@/assets";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export function GenerateBreadcrumb({
  className,
  last,
}: {
  className?: string;
  last?: string;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">
            <IconBookmark />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.length > 0 && pathSegments[0] === "docs" && (
          <Link href="/docs" className="flex flex-row items-center gap-1">
            <BreadcrumbSeparator className="-ml-1">
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              className={cn(
                "line-clamp-1 capitalize duration-300 dark:hover:text-white sm:max-w-full text-xs",
              )}
            >
              docs
            </BreadcrumbItem>
          </Link>
        )}

        {pathSegments.length > 1 && (
          <Link href={pathname} className="flex flex-row items-center gap-1">
            <BreadcrumbSeparator className="-ml-1">
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              className={cn(
                "line-clamp-1 capitalize duration-300 dark:hover:text-white sm:max-w-full text-xs dark:text-white text-black font-semibold",
              )}
            >
              {last
                ? last.split("-").join(" ")
                : pathSegments[pathSegments.length - 1].split("-").join(" ")}
            </BreadcrumbItem>
          </Link>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
