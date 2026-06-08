import { produce } from "immer";
import type { Section } from "~/types";
import { createMeasureGroup, createSection } from "~/utils/factories";

export default function addEmptyMeasureGroup(sections: Section[]) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      prev.push(createSection("Section", [createMeasureGroup()]));
      return prev;
    }

    lastSection.measureGroups.push(createMeasureGroup());
    return prev;
  });
}
