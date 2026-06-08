import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const sections = useKeyboardInput();

  return (
    <div>
      <h1>Chord Tracker</h1>
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-sm font-light text-gray-300">{section.name}</h2>
          <div className="flex flex-col gap-1">
            {section.measureGroups.map((measureGroup) => (
              <div key={measureGroup.id}>
                {measureGroup.measures.map((measure) => (
                  <div className="flex flex-wrap gap-x-1" key={measure.id}>
                    {measure.chords.map((chord) => (
                      <span
                        className="bg-gray-100 pl-2 pr-8 py-1"
                        key={chord.id}
                      >
                        {chord.value}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tracker;
