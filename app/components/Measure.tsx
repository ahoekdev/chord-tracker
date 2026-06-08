import type { Chord as ChordType } from "~/types";
import { Chord } from "./Chord";

interface MeasureProps {
  chords: ChordType[];
}

export function Measure({ chords }: MeasureProps) {
  return (
    <div className="flex flex-wrap gap-x-1">
      {chords.map((chord) => (
        <Chord key={chord.id} name={chord.value} />
      ))}
    </div>
  );
}
