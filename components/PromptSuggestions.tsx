import type { DemoPrompt } from "@/data/types";

type Props = {
  prompts: DemoPrompt[];
  onSelect: (prompt: DemoPrompt) => void;
};

export function PromptSuggestions({ prompts, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/60 p-4">
      <p className="mb-3 text-sm text-white/50">
        ATLAS is in test-mode. Try one of the following prompts instead:
      </p>
      <div className="flex flex-col gap-2">
        {prompts.map((p) => (
          <button
            key={p.id}
            // see note below on onMouseDown vs onClick
            onMouseDown={() => onSelect(p)}
            className="rounded-lg border border-white/10 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/5"
          >
            {p.question}
          </button>
        ))}
      </div>
    </div>
  );
}