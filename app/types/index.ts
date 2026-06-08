type Measure = string[];

type MeasureGroup = Measure[];

export interface Section {
  name: string;
  measureGroups: MeasureGroup[];
}
