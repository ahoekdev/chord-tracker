import { useEffect, useState } from "react";

interface Section {
  name: string;
  chords: string[];
}

const chords = new Set<string>(["A", "B", "C", "D", "E", "F", "G"]);

function useKeyboardInput() {
  const [sections, setSections] = useState<Section[]>([]);

  const addNewSection = (name: string, chords: string[]) =>
    setSections((prev) => prev.concat({ name, chords }));

  const handleAddChordToLastSection = (chord: string) =>
    setSections((prev) =>
      prev.map((s, i) =>
        i === prev.length - 1 ? { ...s, chords: [...s.chords, chord] } : s,
      ),
    );

  const handleNewSection = (chords: string[]) =>
    addNewSection("New Section", chords);

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
  }, [sections, handleNewSection, handleAddChordToLastSection]);

  return { input: sections, setInput: setSections };
}

function getChordFromKey(key: string): string | null {
  if (chords.has(key.toUpperCase())) {
    return key.toUpperCase();
  }

  return null;
}

export default useKeyboardInput;
