import type { Measure as MeasureType, MeasureGroup } from "~/types";
import { Measure } from "./Measure";

interface MeasureGroupProps {
  measures: MeasureType[];
}

export function MeasureGroup({ measures }: MeasureGroupProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {measures.map((measure) => (
        <Measure key={measure.id} chords={measure.chords} />
      ))}
    </div>
  );
}
