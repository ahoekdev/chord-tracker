import { produce } from "immer";
import { createMeasure, createMeasureGroup, createSection } from "./factories";
import type { Section } from "~/types";

export default function addEmptyMeasure(sections: Section[]) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      prev.push(
        createSection("Section", [createMeasureGroup([createMeasure()])]),
      );
      return prev;
    }

    const lastMeasureGroup =
      lastSection.measureGroups[lastSection.measureGroups.length - 1];

    if (!lastMeasureGroup) {
      lastSection.measureGroups.push(createMeasureGroup([createMeasure()]));
      return prev;
    }

    lastMeasureGroup.measures.push(createMeasure());
    return prev;
  });
}
