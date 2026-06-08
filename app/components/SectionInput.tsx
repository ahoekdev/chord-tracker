interface SectionInputProps {
  value: string;
  onChange: (name: string) => void;
  readOnly?: boolean;
}

export function SectionInput({
  value,
  onChange,
  readOnly = false,
}: SectionInputProps) {
  if (readOnly) {
    return (
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500">
        {value || "Untitled section"}
      </p>
    );
  }

  return (
    <input
      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium uppercase tracking-[0.16em] text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-stone-500"
      onChange={(event) => onChange(event.target.value)}
      placeholder="Section name"
      value={value}
    />
  );
}
