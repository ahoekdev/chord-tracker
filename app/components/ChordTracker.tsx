import useSongState from "~/hooks/useSongState";
import { Section } from "./Section/Section";

function ChordTracker() {
  const { title, setTitle, sections, renameSection, saveSong, saveState } =
    useSongState();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Editor</h2>
          <p className="mt-2 text-sm text-stone-500">
            `Shift+Enter` adds a section, `Enter` adds a measure group, letters
            `A-G` add chords, and `Backspace` removes the last chord.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveState === "saved" && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
              Save failed
            </span>
          )}
        <button
          className="rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={saveState === "saving"}
          onClick={() => void saveSong()}
          type="button"
        >
          {saveState === "saving" ? "Saving..." : "Save"}
        </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium uppercase tracking-[0.16em] text-stone-500"
          htmlFor="song-title"
        >
          Song title
        </label>
        <input
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base font-medium text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-500"
          id="song-title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Untitled song"
          value={title}
        />
      </div>
      <div className="flex flex-col gap-5">
        {sections.map(({ id, name, measureGroups }) => (
          <Section
            key={id}
            name={name}
            measureGroups={measureGroups}
            onRename={(name) => renameSection(id, name)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChordTracker;
