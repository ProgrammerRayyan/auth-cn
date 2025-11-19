import fs from "node:fs";
import path from "node:path";

async function findFolderByItemName(
  category: string,
  itemName: string,
): Promise<string | null> {
  const categoryPath = path.join(
    process.cwd(),
    "src/registry/default",
    category,
  );
  const folders = fs.readdirSync(categoryPath);

  for (const folder of folders) {
    const rFilePath = path.join(categoryPath, folder, "r.ts");
    if (fs.existsSync(rFilePath)) {
      if (folder === itemName) {
        return folder;
      }
    }
  }

  return null;
}

export async function getRegistryItem(category: string, name: string) {
  const folder = await findFolderByItemName(category, name);
  if (!folder) return null;

  const registryPath = path.join(
    process.cwd(),
    "src/registry/default",
    category,
    folder,
    "r.ts",
  );

  if (!fs.existsSync(registryPath)) {
    return null;
  }

  const module = await import(`@/registry/default/${category}/${folder}/r.ts`);

  return module.item;
}

export async function getRegistryDocs(category: string, name: string) {
  try {
    const folder = await findFolderByItemName(category, name);
    if (!folder) return null;

    const registryPath = path.join(
      process.cwd(),
      "src/registry/default",
      category,
      folder,
      "r.ts",
    );

    if (!fs.existsSync(registryPath)) {
      return null;
    }

    const module = await import(
      `@/registry/default/${category}/${folder}/r.ts`
    );

    const docsData = module.docs;

    if (typeof docsData === "function") {
      return await docsData();
    }

    return docsData;
  } catch (error) {
    console.error(`Error loading docs for ${category}/${name}:`, error);
    return null;
  }
}

export async function getComponent(category: string, name: string) {
  try {
    const folder = await findFolderByItemName(category, name);
    if (!folder) return null;

    const Component = (
      await import(`@/registry/default/${category}/${folder}/component.tsx`)
    ).default;
    return Component;
  } catch {
    return null;
  }
}

export async function generateStaticParamsServer() {
  const registryPath = path.join(process.cwd(), "src/registry/default");
  const categories = fs.readdirSync(registryPath);

  const params = [];
  for (const category of categories) {
    const categoryPath = path.join(registryPath, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const folders = fs.readdirSync(categoryPath);
      for (const folder of folders) {
        const rFilePath = path.join(categoryPath, folder, "r.ts");
        if (fs.existsSync(rFilePath)) {
          params.push({ category, name: folder });
        }
      }
    }
  }

  return params;
}

export async function getSidebarItems(): Promise<
  Record<string, Array<{ name: string; title: string; url: string }>>
> {
  const registryPath = path.join(process.cwd(), "src/registry/default");
  const categories = fs.readdirSync(registryPath);

  const items: Record<
    string,
    Array<{ name: string; title: string; url: string }>
  > = {};

  for (const category of categories) {
    const categoryPath = path.join(registryPath, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const folders = fs.readdirSync(categoryPath);
      items[category] = [];

      for (const folder of folders) {
        const rFilePath = path.join(categoryPath, folder, "r.ts");
        if (fs.existsSync(rFilePath)) {
          try {
            const module = await import(
              `@/registry/default/${category}/${folder}/r.ts`
            );
            const item = module.item;

            // Validate that docs exist
            if (!module.docs) {
              // console.warn(`Missing docs export for ${category}/${folder}`);
              continue;
            }

            items[category].push({
              name: folder,
              title: item.title || folder,
              url: `/docs/${category}/${folder}`,
            });
          } catch (error) {
            console.error(`Error loading ${category}/${folder}:`, error);
          }
        }
      }
    }
  }

  return items;
}
