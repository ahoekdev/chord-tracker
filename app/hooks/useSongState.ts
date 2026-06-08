import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { supabase } from "~/lib/supabase";
import type { Section } from "~/types";
import addEmptyMeasureGroup from "~/utils/addEmptyMeasureGroup";
import addEmptySection from "~/utils/addEmptySection";
import addNewChord from "~/utils/addNewChord";
import deleteLastChord from "~/utils/deleteLastChord";
import { normalizeSongTitle } from "~/utils/songTitle";
import updateSectionName from "~/utils/updateSectionName";

type SaveState = "idle" | "saving" | "saved" | "error";

const chordNames = ["a", "b", "c", "d", "e", "f", "g"];

function useSongState() {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [songId, setSongId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  // Add empty section when space is pressed
  useHotkeys("shift+enter", () => setSections(addEmptySection));

  // Add empty measure group when enter is pressed
  useHotkeys("enter", () => setSections(addEmptyMeasureGroup));

  // Delete last chord when backspace is pressed
  useHotkeys("backspace", () => setSections(deleteLastChord));

  // Add new chord when a, b, c, d, e, f, or g is pressed
  useHotkeys(chordNames, (e) =>
    setSections((prev) => addNewChord(prev, e.key.toUpperCase(), "major")),
  );

  useHotkeys(
    chordNames.map((chord) => "shift+" + chord),
    (e) =>
      setSections((prev) => addNewChord(prev, e.key.toUpperCase(), "minor")),
  );

  async function saveSong() {
    setSaveState("saving");

    const payload = {
      title: normalizeSongTitle(title),
      sections,
      updated_at: new Date().toISOString(),
    };

    if (!songId) {
      const { data, error } = await supabase
        .from("songs")
        .insert({
          ...payload,
          created_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (error || !data) {
        setSaveState("error");
        return;
      }

      setSongId(data.id);
      setSaveState("saved");
      return;
    }

    const { error } = await supabase
      .from("songs")
      .update(payload)
      .eq("id", songId);

    if (error) {
      setSaveState("error");
      return;
    }

    setSaveState("saved");
  }

  return {
    title,
    setTitle,
    sections,
    saveSong,
    saveState,
    songId,
    renameSection: (sectionId: string, name: string) =>
      setSections((prev) => updateSectionName(prev, sectionId, name)),
  };
}

export default useSongState;
