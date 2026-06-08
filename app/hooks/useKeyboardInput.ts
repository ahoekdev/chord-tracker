import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface Section {
  name: string;
  chords: string[];
}

function useKeyboardInput() {
  const [sections, setSections] = useState<Section[]>([]);

  const handleNewSection = useCallback(
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

  useHotkeys(["a", "b", "c", "d", "e", "f", "g"], (e) => {
    const lastSection = sections[sections.length - 1];
    const chord = e.key.toUpperCase();

    if (!lastSection) {
      handleNewSection("Section", [chord]);
    } else {
      handleAddChordToLastSection(chord);
    }
  });

  useHotkeys("space", () => handleNewSection("Section", []));

  return { sections };
}

export default useKeyboardInput;
