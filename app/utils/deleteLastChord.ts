import { produce } from "immer";
import type { Section } from "~/types";

export default function deleteLastChord(sections: Section[]) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      return prev;
    }

    const { measureGroups } = lastSection;

    const lastMeasureGroup = measureGroups[measureGroups.length - 1];

    if (!lastMeasureGroup) {
      return prev;
    }

    const lastMeasure = measureGroups[measureGroups.length - 1];

    if (!lastMeasure) {
      return prev;
    }

    lastMeasure.pop();

    if (lastMeasure.length === 0) {
      measureGroups.pop();
    }

    if (measureGroups.length === 0) {
      prev.pop();
    }

    return prev;
  });
}
