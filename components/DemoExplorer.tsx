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
  const [includeExternalSources, setIncludeExternalSources] = useState(true);

  function handleSelect(prompt: DemoPrompt) {
    onActivePromptChange(prompt);
    setValue("");
    setFocused(false);
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto flex">
        {activePrompt && (
          <div key={activePrompt.id} className="pt-2 pb-4 px-8 space-y-4 w-full">
            <div className="flex justify-end pb-6">
              <p className="max-w-[85%] rounded-xl bg-white/10 px-4 py-2 text-sm text-white/90 animate-fade-in-up">
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
          className={`overflow-hidden transition-all duration-300 ease-out ${
            focused ? "mb-2 opacity-100 translate-y-0" : "mb-0 opacity-0 -translate-y-2 pointer-events-none h-0"
          }`}
        >
          <PromptSuggestions prompts={demoPrompts} onSelect={handleSelect} />
        </div>

        <div className="flex items-center justify-between pb-4 px-1">
          <button
            type="button"
            onClick={() => setIncludeExternalSources((prev) => !prev)}
            className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80"
          >
            <span
              className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${
                includeExternalSources ? "bg-highlight-green" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 rounded-full bg-dark-text transition-transform ${
                  includeExternalSources ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </span>
            Include external sources
          </button>

          <p className="text-xs text-white/40">Your chats are private</p>
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