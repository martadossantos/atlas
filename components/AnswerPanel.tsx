import type { DemoPrompt } from "@/data/types";

type Props = {
  prompt: DemoPrompt;
  hoveredSourceId: string | null;
  onHoverSegment: (sourceIds: string[]) => void;
};

export function AnswerPanel({ prompt, hoveredSourceId, onHoverSegment }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-white/40">
        <span className="h-2 w-2 rounded-full bg-lime-400" />
        Searched {prompt.searchedCount.toLocaleString()} documents
      </div>

      {prompt.noConfidentAnswer && (
        <div className="rounded-lg border border-conflict-red/30 bg-conflict-red/5 px-4 py-2 text-sm text-conflict-red">
          I don't have a confident answer to this one.
        </div>
      )}

      <div className="space-y-4 text-sm leading-relaxed text-white/80">
        {prompt.segments.map((segment, i) => {
          const isHovered =
            hoveredSourceId !== null && segment.citedSourceIds.includes(hoveredSourceId);

          return (
            <p
              key={i}
              onMouseEnter={() => onHoverSegment(segment.citedSourceIds)}
              onMouseLeave={() => onHoverSegment([])}
              className={`rounded px-1 -mx-1 transition-colors ${
                isHovered ? "underline underline-offset-3 decoration-source-highlight/60" : ""
              }`}
            >
              {segment.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}