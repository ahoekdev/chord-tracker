import ChordTracker from "~/components/ChordTracker";

export function meta() {
  return [
    { title: "Chord Tracker" },
    { name: "description", content: "Chord Tracker" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ChordTracker />
    </div>
  );
}
