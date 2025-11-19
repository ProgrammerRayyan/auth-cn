import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsRenderer } from "@/components/docs/docs-renderer";
import {
  generateStaticParamsServer,
  getRegistryDocs,
  getRegistryItem,
} from "@/lib/utils-server";

interface PageProps {
  params: Promise<{ category: string; name: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, name } = await params;
  const item = await getRegistryItem(category, name);

  if (!item) {
    return {
      title: "Component not found",
    };
  }

  const title = item.title || name;
  const description = item.description || `Documentation for ${title}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;

  return {
    title: `${title} | Auth CN`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/docs/${category}/${name}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category, name } = await params;

  const item = await getRegistryItem(category, name);
  const docs = await getRegistryDocs(category, name);

  if (!item || !docs) {
    notFound();
  }

  return (
    <div>
      <DocsRenderer content={docs} category={category} name={name} />
    </div>
  );
}

export async function generateStaticParams() {
  return generateStaticParamsServer();
}

export const dynamic = "force-static";
export const revalidate = false;
