import { useCallback, useEffect, useState } from "react";
import { getChordFromKey } from "~/utils/getChordFromKey";

interface Section {
  name: string;
  chords: string[];
}

function useKeyboardInput() {
  const [sections, setSections] = useState<Section[]>([]);

  const addNewSection = useCallback(
    (name: string, chords: string[]) =>
      setSections((prev) => prev.concat({ name, chords })),
    [setSections],
  );

  const handleAddChordToLastSection = useCallback(
    (chord: string) =>
      setSections((prev) =>
        prev.map((s, i) =>
          i === prev.length - 1 ? { ...s, chords: [...s.chords, chord] } : s,
        ),
      ),
    [setSections],
  );

  const handleNewSection = useCallback(
    (chords: string[]) => addNewSection("New Section", chords),
    [addNewSection],
  );

  useEffect(() => {
    const handleKeyDown = ({ key, code }: KeyboardEvent) => {
      if (code === "Space") {
        handleNewSection([]);
        return;
      }

      const chord = getChordFromKey(key);

      if (!chord) {
        return;
      }

      const lastSection = sections[sections.length - 1];

      if (!lastSection) {
        handleNewSection([chord]);
      } else {
        handleAddChordToLastSection(chord);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAddChordToLastSection, handleNewSection, sections]);

  return { sections };
}

export default useKeyboardInput;
