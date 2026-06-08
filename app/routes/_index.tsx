import { Link } from "react-router";

export function meta() {
  return [
    { title: "Chord Tracker" },
    { name: "description", content: "Chord Tracker" },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Chord Tracker
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">
            Start a new chart or browse saved songs
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            className="rounded-xl bg-stone-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-700"
            to="/new"
          >
            New Song
          </Link>
          <Link
            className="rounded-xl border border-stone-300 px-4 py-3 text-center text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-50"
            to="/songs"
          >
            View Songs
          </Link>
        </div>
      </div>
    </main>
  );
}
