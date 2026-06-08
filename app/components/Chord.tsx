import type { ChordQuality } from "~/types";

interface ChordProps {
  name: string;
  quality: ChordQuality;
}

export function Chord({ name, quality }: ChordProps) {
  return (
    <span className="rounded-md border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-800">
      {name}
      {quality === "minor" && "m"}
    </span>
  );
}
