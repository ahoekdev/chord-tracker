export interface Chord {
  id: string;
  value: string;
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
