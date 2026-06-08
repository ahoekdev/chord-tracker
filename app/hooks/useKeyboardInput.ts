import { useEffect, useState } from "react";

function useKeyboardInput() {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setInput((prev) => [...prev, event.key]);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { input, setInput };
}

export default useKeyboardInput;
