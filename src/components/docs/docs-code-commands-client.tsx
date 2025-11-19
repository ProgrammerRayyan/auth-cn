"use client";

import { useState } from "react";
import { IconCodeEditor } from "@/assets";
import { CopyButton } from "@/components/ui/copy-button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocsCodeCommandClientProps {
  defaultManager: string;
  codeBlocks: Record<string, string>;
  managers: string[];
}

export const DocsCodeCommandClient = ({
  defaultManager,
  codeBlocks,
  managers,
}: DocsCodeCommandClientProps) => {
  const [activeTab, setActiveTab] = useState(defaultManager);

  return (
    <div className="flex flex-wrap items-center justify-between px-4 bg-card rounded-t-xl border-b">
      <div className="flex items-center gap-2">
        <IconCodeEditor />
        <TabsList className="bg-card">
          {managers.map((manager) => (
            <TabsTrigger
              key={manager}
              value={manager}
              className="px-2 h-6 text-sm"
              onClick={() => setActiveTab(manager)}
            >
              {manager.replace(/x$/, "")}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <CopyButton code={codeBlocks[activeTab]} />
    </div>
  );
};
