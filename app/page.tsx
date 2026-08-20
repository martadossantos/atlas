"use client";

import { useState } from "react";
import { DemoExplorer } from "@/components/DemoExplorer";
import { SourceSidebar } from "@/components/SourceSidebar";
import type { DemoPrompt } from "@/data/types";

export default function Home() {
  const [activePrompt, setActivePrompt] = useState<DemoPrompt | null>(null);
  const [hoveredSourceIds, setHoveredSourceIds] = useState<string[]>([]);

  return (
    <div className="bg-blue-100 h-screen">
      <main className="bg-background max-w-6xl m-auto h-full flex flex-col font-sans">
        <nav className="border-b-1 border-white p-4 shrink-0">
          <a href="#" className="font-unbounded font-black text-2xl text-highlight-green">ATLAS</a>
        </nav>

        <div className="grid grid-cols-5 flex-1 min-h-0">

          {/* Chat Area */}
          <div className="border-r-1 border-white h-full col-span-3 p-4 min-h-0">

            <DemoExplorer
              activePrompt={activePrompt}
              onActivePromptChange={setActivePrompt}
              hoveredSourceIds={hoveredSourceIds}
              onHoveredSourceIdsChange={setHoveredSourceIds}
            />
          </div>

          {/* Sources etc */}
          <div className="p-4 col-span-2 overflow-y-auto">
            <h3>Sources</h3>
            {activePrompt && (
              <SourceSidebar sources={activePrompt.sources} hoveredSourceIds={hoveredSourceIds} />
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
