import { produce } from "immer";
import type { Section } from "~/types";

export default function addNewChord(sections: Section[], chord: string) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      prev.push({ name: "Section", measureGroups: [[[chord]]] });
      return prev;
    }

    const { measureGroups } = lastSection;

    const lastMeasureGroup = measureGroups[measureGroups.length - 1];

    if (!lastMeasureGroup) {
      lastSection.measureGroups.push([[chord]]);
      return prev;
    }

    const lastMeasure = lastMeasureGroup[lastMeasureGroup.length - 1];

    if (!lastMeasure) {
      lastMeasureGroup.push([chord]);
      return prev;
    }

    lastMeasure.push(chord);

    return prev;
  });
}
