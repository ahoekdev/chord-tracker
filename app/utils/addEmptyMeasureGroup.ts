import { produce } from "immer";
import type { Section } from "~/types";

export default function addEmptyMeasureGroup(sections: Section[]) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      prev.push({ name: "Section", measureGroups: [[]] });
      return prev;
    }

    lastSection.measureGroups.push([]);
    return prev;
  });
}
