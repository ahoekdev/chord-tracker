import { produce } from "immer";
import type { Section } from "~/types";

export default function addEmptySection(sections: Section[]) {
  return produce(sections, (prev) =>
    prev.concat({ name: "Section", measureGroups: [[]] }),
  );
}
