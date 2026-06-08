import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const { input } = useKeyboardInput();

  return (
    <div>
      {input.map((section) => (
        <div key={section.name}>
          <h2>New Section</h2>
          <p>{section.chords.join(" ")}</p>
        </div>
      ))}
    </div>
  );
}

export default Tracker;
