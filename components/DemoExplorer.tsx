"use client";

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { PromptSuggestions } from "./PromptSuggestions";
import { AnswerPanel } from "./AnswerPanel";
import { demoPrompts } from "@/data/demo-data";
import type { DemoPrompt } from "@/data/types";

type Props = {
  activePrompt: DemoPrompt | null;
  onActivePromptChange: (prompt: DemoPrompt | null) => void;
  hoveredSourceIds: string[];
  onHoveredSourceIdsChange: (sourceIds: string[]) => void;
};

export function DemoExplorer({
  activePrompt,
  onActivePromptChange,
  hoveredSourceIds,
  onHoveredSourceIdsChange,
}: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSelect(prompt: DemoPrompt) {
    onActivePromptChange(prompt);
    setValue("");
    setFocused(false);
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto flex">
        {activePrompt && (
          <div className="pt-2 pb-4 px-8 space-y-4 w-full">
            <div className="flex justify-end pb-6">
              <p className="max-w-[85%] rounded-xl bg-white/10 px-4 py-2 text-sm text-white/90">
                {activePrompt.question}
              </p>
            </div>
            <AnswerPanel
              prompt={activePrompt}
              hoveredSourceId={hoveredSourceIds[0] ?? null}
              onHoverSegment={onHoveredSourceIdsChange}
            />
          </div>
        )}
      </div>

      <div className="shrink-0">
        <div
          className={`transition-all duration-300 ease-out ${
            focused ? "mb-2 opacity-100 translate-y-0" : "mb-0 opacity-0 -translate-y-2 pointer-events-none h-0"
          }`}
        >
          <PromptSuggestions prompts={demoPrompts} onSelect={handleSelect} />
        </div>

        <ChatInput
          value={value}
          onChange={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmit={() => {}}
        />
      </div>
    </div>
  );
}