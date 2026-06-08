import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { Section } from "~/types";
import addEmptyMeasureGroup from "~/utils/addEmptyMeasureGroup";
import addEmptySection from "~/utils/addEmptySection";
import addNewChord from "~/utils/addNewChord";
import deleteLastChord from "~/utils/deleteLastChord";
import updateSectionName from "~/utils/updateSectionName";

function useSongState(
  firstSectionInputRef: React.RefObject<HTMLInputElement | null>,
) {
  const [sections, setSections] = useState<Section[]>([]);

  // Add empty section when space is pressed
  useHotkeys("shift+enter", () => setSections(addEmptySection));

  // Add empty measure group when enter is pressed
  useHotkeys("enter", () => setSections(addEmptyMeasureGroup));

  // Delete last chord when backspace is pressed
  useHotkeys("backspace", () => setSections(deleteLastChord));

  // Add new chord when a, b, c, d, e, f, or g is pressed
  useHotkeys(["a", "b", "c", "d", "e", "f", "g"], (e) =>
    setSections((prev) => addNewChord(prev, e.key.toUpperCase())),
  );

  useHotkeys(["ctrl+s", "meta+s"], (event) => {
    event.preventDefault();
    firstSectionInputRef.current?.focus();
  });

  return {
    sections,
    renameSection: (sectionId: string, name: string) =>
      setSections((prev) => updateSectionName(prev, sectionId, name)),
  };
}

export default useSongState;
