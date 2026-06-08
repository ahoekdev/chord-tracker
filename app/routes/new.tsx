import { Link } from "react-router";
import ChordTracker from "~/components/ChordTracker";

export function meta() {
  return [
    { title: "Chord Tracker" },
    { name: "description", content: "Chord Tracker" },
  ];
}

export default function New() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Chord Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900">
              New Song
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Build a chart with keyboard shortcuts, then save it to your songs
              list.
            </p>
          </div>
          <Link
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-50"
            to="/songs"
          >
            View songs
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <ChordTracker />
        </div>
      </div>
    </main>
  );
}
