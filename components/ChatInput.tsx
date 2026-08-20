type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export function ChatInput({ value, onChange, onSubmit, disabled, onFocus, onBlur }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-4 px-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Ask your question in plain English"
        disabled={disabled}
        className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 focus:outline-none"
      />
      <button onClick={onSubmit} disabled={disabled} className="rounded-lg bg-highlight-green px-2 py-2 text-sm font-medium text-dark-text disabled:opacity-40">
        Ask
      </button>
    </div>
  );
}