import Code from "@/components/ui/code";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DocsCodeCommandClient } from "./docs-code-commands-client";

type PackageManager =
  | "pnpm"
  | "npm"
  | "yarn"
  | "bun"
  | "pnpmx"
  | "npmx"
  | "yarnx"
  | "bunx";

const COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
  pnpmx: "pnpm dlx",
  npmx: "npx",
  yarnx: "yarn",
  bunx: "bunx --bun",
};

type InstallManager = "pnpm" | "npm" | "yarn" | "bun";
type ExecuteManager = "pnpmx" | "npmx" | "yarnx" | "bunx";

interface DocsCodeCommandProps {
  command: string;
  defaultManager?: InstallManager;
}

interface DocsCodeCommandXProps {
  command: string;
  defaultManager?: ExecuteManager;
}

const DocsCodeCommand = ({
  command,
  defaultManager = "pnpm",
}: DocsCodeCommandProps) => {
  const getFullCommand = (manager: InstallManager): string => {
    return `${COMMANDS[manager]} ${command}`;
  };

  const codeBlocks = {
    pnpm: getFullCommand("pnpm"),
    npm: getFullCommand("npm"),
    yarn: getFullCommand("yarn"),
    bun: getFullCommand("bun"),
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border dark:[--color-muted:var(--color-zinc-900)] overflow-hidden flex flex-col mt-4">
      <Tabs defaultValue={defaultManager} className="flex-1 flex flex-col">
        <DocsCodeCommandClient
          defaultManager={defaultManager}
          codeBlocks={codeBlocks}
          managers={["pnpm", "npm", "yarn", "bun"]}
        />
        <div className="flex-1 overflow-auto">
          <TabsContent value="pnpm" className="h-full py-2">
            <Code code={codeBlocks.pnpm} language="bash" />
          </TabsContent>
          <TabsContent value="npm" className="h-full py-2">
            <Code code={codeBlocks.npm} language="bash" />
          </TabsContent>
          <TabsContent value="yarn" className="h-full py-2">
            <Code code={codeBlocks.yarn} language="bash" />
          </TabsContent>
          <TabsContent value="bun" className="h-full py-2">
            <Code code={codeBlocks.bun} language="bash" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

const DocsCodeCommandX = ({
  command,
  defaultManager = "pnpmx",
}: DocsCodeCommandXProps) => {
  const getFullCommand = (manager: ExecuteManager): string => {
    return `${COMMANDS[manager]} ${command}`;
  };

  const codeBlocks = {
    pnpmx: getFullCommand("pnpmx"),
    npmx: getFullCommand("npmx"),
    yarnx: getFullCommand("yarnx"),
    bunx: getFullCommand("bunx"),
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border dark:[--color-muted:var(--color-zinc-900)] overflow-hidden flex flex-col mt-4">
      <Tabs defaultValue={defaultManager} className="flex-1 flex flex-col">
        <DocsCodeCommandClient
          defaultManager={defaultManager}
          codeBlocks={codeBlocks}
          managers={["pnpmx", "npmx", "yarnx", "bunx"]}
        />
        <div className="flex-1 overflow-auto">
          <TabsContent value="pnpmx" className="h-full py-2">
            <Code code={codeBlocks.pnpmx} language="bash" />
          </TabsContent>
          <TabsContent value="npmx" className="h-full py-2">
            <Code code={codeBlocks.npmx} language="bash" />
          </TabsContent>
          <TabsContent value="yarnx" className="h-full py-2">
            <Code code={codeBlocks.yarnx} language="bash" />
          </TabsContent>
          <TabsContent value="bunx" className="h-full py-2">
            <Code code={codeBlocks.bunx} language="bash" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export { DocsCodeCommand, DocsCodeCommandX };
