import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const { sections } = useKeyboardInput();

  return (
    <div>
      {sections.map(({ name, chords }) => (
        <div key={name}>
          <h2 className="text-sm font-light text-gray-300">{name}</h2>
          <div className="flex flex-wrap gap-x-1">
            {chords.map((chord) => (
              <span
                className="bg-gray-100 pl-2 pr-8 py-1"
                key={chord}
              >{`${chord}`}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tracker;
