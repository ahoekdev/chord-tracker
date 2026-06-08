import type { Measure as MeasureType, MeasureGroup } from "~/types";
import { Measure } from "./Measure";

interface MeasureGroupProps {
  measures: MeasureType[];
}

export function MeasureGroup({ measures }: MeasureGroupProps) {
  return (
    <div>
      {measures.map((measure) => (
        <Measure key={measure.id} chords={measure.chords} />
      ))}
    </div>
  );
}
