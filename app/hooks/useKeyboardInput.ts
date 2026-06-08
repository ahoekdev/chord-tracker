import { produce } from "immer";
import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Measure = string[];

type MeasureGroup = Measure[];

interface Section {
  name: string;
  measureGroups: MeasureGroup[];
}

function useKeyboardInput() {
  const [sections, setSections] = useState<Section[]>([]);

  const handleNewSection = useCallback(
    (name: string, chords: string[]) =>
      setSections(
        produce((prev) => prev.concat({ name, measureGroups: [[chords]] })),
      ),
    [setSections],
  );

  const handleAddMeasure = useCallback(
    (chord: string) =>
      setSections(
        produce((prev) => {
          const lastSection = prev[prev.length - 1];

          if (!lastSection) {
            return prev;
          }

          const { measureGroups } = lastSection;

          const lastMeasureGroup = measureGroups[measureGroups.length - 1];

          if (!lastMeasureGroup) {
            return prev;
          }

          lastMeasureGroup.push([chord]);

          return prev;
        }),
      ),
    [setSections],
  );

  useHotkeys(["a", "b", "c", "d", "e", "f", "g"], (e) => {
    const lastSection = sections[sections.length - 1];

    const chord = e.key.toUpperCase();

    if (!lastSection) {
      handleNewSection("Section", [chord]);
    } else {
      handleAddMeasure(chord);
    }
  });

  useHotkeys("space", () => handleNewSection("Section", []));

  return { sections };
}

export default useKeyboardInput;
