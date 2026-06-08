import type { MeasureGroup as MeasureGroupType } from "~/types";
import { MeasureGroup } from "../MeasureGroup";
import { SectionInput } from "../SectionInput";

interface SectionProps {
  name: string;
  measureGroups: MeasureGroupType[];
  onRename: (name: string) => void;
  readOnly?: boolean;
}

export function Section({
  name,
  measureGroups,
  onRename,
  readOnly = false,
}: SectionProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <SectionInput
        value={name}
        onChange={(name) => onRename(name)}
        readOnly={readOnly}
      />
      <div className="mt-3 flex flex-col gap-3">
        {measureGroups.map(({ id, measures }) => (
          <MeasureGroup key={id} measures={measures} />
        ))}
      </div>
    </section>
  );
}
