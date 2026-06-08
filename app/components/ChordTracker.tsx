import useSongState from "~/hooks/useSongState";
import { Section } from "./Section/Section";

function ChordTracker() {
  const { sections, renameSection } = useSongState();

  return (
    <div>
      <h1>Chord Tracker</h1>
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
