import { produce } from "immer";
import type { Section } from "~/types";

export default function updateSectionName(
  sections: Section[],
  sectionId: string,
  name: string,
) {
  return produce(sections, (prev) => {
    const section = prev.find((entry) => entry.id === sectionId);

    if (!section) {
      return prev;
    }

    section.name = name;

    return prev;
  });
}
