import useKeyboardInput from "~/hooks/useKeyboardInput";

function Tracker() {
  const { input } = useKeyboardInput();

  return <div>{input.join(" | ")}</div>;
}

export default Tracker;
