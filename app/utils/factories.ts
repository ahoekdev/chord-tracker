import type {
  Chord,
  ChordQuality,
  Measure,
  MeasureGroup,
  Section,
} from "~/types";

function id() {
  return crypto.randomUUID();
}

export function createChord(value: string, quality: ChordQuality): Chord {
  return { id: id(), value, quality };
}

export function createMeasure(chords: Chord[] = []): Measure {
  return { id: id(), chords };
}

export function createMeasureGroup(measures: Measure[] = []): MeasureGroup {
  return { id: id(), measures };
}

export function createSection(
  name = "Section",
  measureGroups: MeasureGroup[] = [],
): Section {
  return { id: id(), name, measureGroups };
}
