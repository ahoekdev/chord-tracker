import { produce } from "immer";
import type { ChordQuality, Section } from "~/types";
import {
  createChord,
  createMeasure,
  createMeasureGroup,
  createSection,
} from "~/utils/factories";

export default function addChordToLastMeasure(
  sections: Section[],
  chord: string,
  quality: ChordQuality,
) {
  return produce(sections, (prev) => {
    const lastSection = prev[prev.length - 1];

    if (!lastSection) {
      prev.push(
        createSection("Section", [
          createMeasureGroup([createMeasure([createChord(chord, quality)])]),
        ]),
      );
      return prev;
    }

    const { measureGroups } = lastSection;

    const lastMeasureGroup = measureGroups[measureGroups.length - 1];

    if (!lastMeasureGroup) {
      lastSection.measureGroups.push(
        createMeasureGroup([createMeasure([createChord(chord, quality)])]),
      );
      return prev;
    }

    const lastMeasure =
      lastMeasureGroup.measures[lastMeasureGroup.measures.length - 1];

    if (!lastMeasure) {
      lastMeasureGroup.measures.push(
        createMeasure([createChord(chord, quality)]),
      );
      return prev;
    }

    lastMeasure.chords.push(createChord(chord, quality));

    return prev;
  });
}
