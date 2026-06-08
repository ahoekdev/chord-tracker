import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const { sections } = useKeyboardInput();

  return (
    <div>
      {sections.map(({ name, chords }) => (
        <div key={name}>
          <h2>{name}</h2>
          <p>{chords.join(" ")}</p>
        </div>
      ))}
    </div>
  );
}

export default Tracker;
