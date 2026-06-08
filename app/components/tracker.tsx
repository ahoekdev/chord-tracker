import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const sections = useKeyboardInput();

  return (
    <div>
      <h1>Chord Tracker</h1>
      {sections.map(({ name, measureGroups }) => (
        <div key={name}>
          <h2 className="text-sm font-light text-gray-300">{name}</h2>
          <div className="flex flex-col gap-1">
            {measureGroups.map((measureGroup, index) => (
              <div key={index}>
                {measureGroup.map((measure, index) => (
                  <div className="flex flex-wrap gap-x-1" key={index}>
                    {measure.map((chord, index) => (
                      <span className="bg-gray-100 pl-2 pr-8 py-1" key={index}>
                        {chord}
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
