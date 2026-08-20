"use client";

import { useState } from "react";
import { DemoExplorer } from "@/components/DemoExplorer";
import { SourceSidebar } from "@/components/SourceSidebar";
import type { DemoPrompt } from "@/data/types";

export default function Home() {
  const [activePrompt, setActivePrompt] = useState<DemoPrompt | null>(null);
  const [hoveredSourceIds, setHoveredSourceIds] = useState<string[]>([]);

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
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
          <div className="col-span-2 overflow-y-auto">
            <div className="border-b-1 border-white px-4 py-8">
                <h3 className="font-bold" pb-3>Sources</h3>
                {activePrompt && (
                  <SourceSidebar
                    sources={activePrompt.sources.filter((source) => source.type === "internal")}
                    hoveredSourceIds={hoveredSourceIds}
                  />
                )}
            </div>

            <div className="px-4 py-8">
              <h3 className="font-bold pb-3">External Links</h3>
              {activePrompt && (() => {
                const externalSources = activePrompt.sources.filter((source) => source.type === "external");
                return externalSources.length > 0 ? (
                  <SourceSidebar sources={externalSources} hoveredSourceIds={hoveredSourceIds} />
                ) : (
                  <p className="text-sm text-white/40">This chat is not using external sources.</p>
                );
              })()}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
