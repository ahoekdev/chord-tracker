import useSongState from "~/hooks/useSongState";
import { Section } from "./Section/Section";

function ChordTracker() {
  const { sections, renameSection, saveSong, saveState } = useSongState();

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h1>Chord Tracker</h1>
        <button
          className="rounded bg-gray-900 px-3 py-1 text-sm text-white disabled:opacity-50"
          disabled={saveState === "saving"}
          onClick={() => void saveSong()}
          type="button"
        >
          {saveState === "saving" ? "Saving..." : "Save"}
        </button>
        {saveState === "saved" && (
          <span className="text-sm text-green-600">Saved</span>
        )}
        {saveState === "error" && (
          <span className="text-sm text-red-600">Save failed</span>
        )}
      </div>
      {sections.map(({ id, name, measureGroups }) => (
        <Section
          key={id}
          name={name}
          measureGroups={measureGroups}
          onRename={(name) => renameSection(id, name)}
        />
      ))}
    </div>
  );
}

export default ChordTracker;
