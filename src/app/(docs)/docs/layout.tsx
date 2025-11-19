import DocsHeader from "@/components/docs/docs-header";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { GenerateBreadcrumb } from "@/components/docs/generate-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <DocsHeader />
        <div className="p-6 w-full flex flex-col gap-4 max-w-[800px] mx-auto">
          <GenerateBreadcrumb />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
