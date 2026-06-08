import { produce } from "immer";
import type { Section } from "~/types";

export default function deleteLastChord(sections: Section[]) {
  return produce(sections, (prev) => {
    while (prev.length > 0) {
      const lastSection = prev[prev.length - 1];

      while (lastSection.measureGroups.length > 0) {
        const lastMeasureGroup =
          lastSection.measureGroups[lastSection.measureGroups.length - 1];

        while (lastMeasureGroup.length > 0) {
          const lastMeasure = lastMeasureGroup[lastMeasureGroup.length - 1];

          if (lastMeasure.length === 0) {
            lastMeasureGroup.pop();
            continue;
          }

          lastMeasure.pop();

          if (lastMeasure.length === 0) {
            lastMeasureGroup.pop();
          }

          if (lastMeasureGroup.length === 0) {
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
