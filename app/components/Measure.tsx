import type { Chord as ChordType } from "~/types";
import { Chord } from "./Chord";

interface MeasureProps {
  chords: ChordType[];
}

export function Measure({ chords }: MeasureProps) {
  return (
    <div className="flex min-h-12 flex-wrap gap-2 rounded-xl border border-stone-200 bg-white p-3">
      {chords.map((chord) => (
        <Chord key={chord.id} name={chord.value} />
      ))}
    </div>
  );
}
