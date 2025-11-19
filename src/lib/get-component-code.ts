import fs from "node:fs";
import path from "node:path";

export async function getComponentCode(fileName: string): Promise<string> {
  const registryPath = path.join(process.cwd(), "src/registry/default");
  const extensions = [".tsx", ".ts"];

  if (!fileName.includes(".")) {
    for (const ext of extensions) {
      const fullPath = path.join(registryPath, fileName + ext);
      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath, "utf-8");
      }
    }
  } else {
    const fullPath = path.join(registryPath, fileName);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8");
    }
  }

  throw new Error(`File not found: ${fileName}`);
}
