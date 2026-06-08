import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { Section } from "~/types";
import addEmptySection from "~/utils/addEmptySection";
import addNewChord from "~/utils/addNewChord";
import deleteLastChord from "~/utils/deleteLastChord";

function useKeyboardInput() {
  const [sections, setSections] = useState<Section[]>([]);

  // Add empty section when space is pressed
  useHotkeys("space", () => setSections(addEmptySection));

  // Delete last chord when backspace is pressed
  useHotkeys("backspace", () => setSections(deleteLastChord));

  // Add new chord when a, b, c, d, e, f, or g is pressed
  useHotkeys(["a", "b", "c", "d", "e", "f", "g"], (e) =>
    setSections((prev) => addNewChord(prev, e.key.toUpperCase())),
  );

  return sections;
}

export default useKeyboardInput;
