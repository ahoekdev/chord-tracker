import type { ChordQuality } from "~/types";

interface ChordProps {
  name: string;
  quality: ChordQuality;
}

export function Chord({ name, quality }: ChordProps) {
  return (
    <span className="">
      {name}
      {quality === "minor" && "m"}
    </span>
  );
}
