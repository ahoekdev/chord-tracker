import { produce } from "immer";
import type { Section } from "~/types";

export default function deleteLastChord(sections: Section[]) {
  return produce(sections, (prev) => {
    while (prev.length > 0) {
      const lastSection = prev[prev.length - 1];

      while (lastSection.measureGroups.length > 0) {
        const lastMeasureGroup =
          lastSection.measureGroups[lastSection.measureGroups.length - 1];

        while (lastMeasureGroup.measures.length > 0) {
          const lastMeasure =
            lastMeasureGroup.measures[lastMeasureGroup.measures.length - 1];

          if (lastMeasure.chords.length === 0) {
            lastMeasureGroup.measures.pop();
            continue;
          }

          lastMeasure.chords.pop();

          if (lastMeasure.chords.length === 0) {
            lastMeasureGroup.measures.pop();
          }

          if (lastMeasureGroup.measures.length === 0) {
            lastSection.measureGroups.pop();
          }

          if (lastSection.measureGroups.length === 0) {
            prev.pop();
          }

          return prev;
        }

        lastSection.measureGroups.pop();
      }

      prev.pop();
    }

    return prev;
  });
}
