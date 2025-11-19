import { notFound } from "next/navigation";
import {
  generateStaticParamsServer,
  getComponent,
  getRegistryItem,
} from "@/lib/utils-server";

interface PageProps {
  params: Promise<{ category: string; name: string }>;
}

export default async function Page({ params }: PageProps) {
  const { category, name } = await params;

  const item = await getRegistryItem(category, name);
  const Component = await getComponent(category, name);

  if (!item || !Component) {
    notFound();
  }

  return <Component />;
}

export async function generateStaticParams() {
  return generateStaticParamsServer();
}

export const dynamic = "force-static";
export const revalidate = false;
