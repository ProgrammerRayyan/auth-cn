import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/lib/utils-server";
import DocsMenuItems from "./docs-menu-items";
import DocsSidebarHeader from "./docs-sidebar-header";

export async function DocsSidebar() {
  const sidebarItems = await getSidebarItems();

  const gettingStartedItems = [
    { name: "introduction", title: "Introduction", url: "/docs" },
    {
      name: "prerequisites",
      title: "Prerequisites",
      url: "/docs/prerequisites",
    },
  ];

  return (
    <Sidebar>
      <DocsSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <DocsMenuItems items={gettingStartedItems} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {Object.entries(sidebarItems).map(([category, items]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <DocsMenuItems items={items} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
