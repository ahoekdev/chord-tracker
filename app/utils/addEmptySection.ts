import { produce } from "immer";
import type { Section } from "~/types";
import { createMeasureGroup, createSection } from "~/utils/factories";

export default function addEmptySection(sections: Section[]) {
  return produce(sections, (prev) =>
    prev.concat(createSection("Section", [createMeasureGroup()])),
  );
}
