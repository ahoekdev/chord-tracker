import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const { sections } = useKeyboardInput();

  console.log(sections);

  return (
    <div>
      {sections.map(({ name, measureGroups }) => (
        <div key={name}>
          <h2 className="text-sm font-light text-gray-300">{name}</h2>
          <div className="flex flex-wrap gap-x-1">
            {measureGroups.map((measureGroup) => (
              <div
                className="flex flex-wrap gap-x-1"
                key={measureGroup.join(",")}
              >
                {measureGroup.map((measure) => (
                  <span key={measure.join(",")}>
                    {measure.map((chord, index) => (
                      <span className="bg-gray-100 pl-2 pr-8 py-1" key={index}>
                        {chord}
                      </span>
                    ))}
                  </span>
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
