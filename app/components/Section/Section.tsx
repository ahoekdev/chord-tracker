import type { MeasureGroup as MeasureGroupType } from "~/types";
import { MeasureGroup } from "../MeasureGroup";
import { SectionInput } from "../SectionInput";

interface SectionProps {
  name: string;
  measureGroups: MeasureGroupType[];
  onRename: (name: string) => void;
}

export function Section({ name, measureGroups, onRename }: SectionProps) {
  return (
    <div>
      <SectionInput value={name} onChange={(name) => onRename(name)} />
      <div className="flex flex-col gap-1">
        {measureGroups.map(({ id, measures }) => (
          <MeasureGroup key={id} measures={measures} />
        ))}
      </div>
    </div>
  );
}
