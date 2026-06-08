export type ChordQuality = "major" | "minor" | "diminished" | "augmented";

export interface Chord {
  id: string;
  value: string;
  quality: ChordQuality;
}

export interface Measure {
  id: string;
  chords: Chord[];
}

export interface MeasureGroup {
  id: string;
  measures: Measure[];
}

export interface Section {
  id: string;
  name: string;
  measureGroups: MeasureGroup[];
}
