import type { Source } from "@/data/types";
import { FileIcon } from "./FileIcon";
import { LinkArrowIcon } from "./LinkArrowIcon";

type Props = {
  sources: Source[];
  hoveredSourceIds: string[];
};

export function SourceSidebar({ sources, hoveredSourceIds }: Props) {
  return (
    <div className="space-y-2">
      {sources.map((source) => {
        const isHighlighted = hoveredSourceIds.includes(source.id);

        return (
          <button
            key={source.id}
            type="button"
            className={`group w-full rounded-lg border border-white/10 px-4 py-3 text-sm flex flex-col gap-2 text-left transition-colors hover:border-white/20 hover:bg-white/5 ${
              isHighlighted ? "bg-source-highlight/10 border-source-highlight/30" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-medium text-white/80">
                <FileIcon className="h-4 w-4 shrink-0 text-white/40" />
                {source.filename}
              </span>
              <span className="flex items-center gap-2">
                {source.status && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${
                      source.status === "conflict"
                        ? "border-conflict-red/30 text-conflict-red"
                        : "border-amber-400/30 text-amber-200"
                    }`}
                  >
                    {source.status}
                  </span>
                )}
                <LinkArrowIcon className="h-3 w-3 shrink-0 text-white/40 transition-colors group-hover:text-white/80" />
              </span>
            </div>
            <div className="flex flex-row justify-between">
                <p className="mt-1 text-xs text-white/40">{source.location}</p>
                <p className="mt-1 text-xs text-white/30">Last edited {source.lastEdited}</p>
            </div>

          </button>
        );
      })}
    </div>
  );
}
