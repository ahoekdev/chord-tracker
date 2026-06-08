import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "~/lib/supabase";

type SongListItem = {
  id: string;
  created_at: string | null;
};

const createdAtFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function meta() {
  return [
    { title: "Songs | Chord Tracker" },
    { name: "description", content: "Saved songs in Chord Tracker" },
  ];
}

function formatCreatedAt(createdAt: string | null) {
  if (!createdAt) {
    return "Created date unavailable";
  }

  const parsed = new Date(createdAt);

  if (Number.isNaN(parsed.getTime())) {
    return "Created date unavailable";
  }

  return createdAtFormatter.format(parsed);
}

export default function Songs() {
  const [songs, setSongs] = useState<SongListItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSongs() {
      const { data, error } = await supabase
        .from("songs")
        .select("id, created_at")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error || !data) {
        setStatus("error");
        return;
      }

      setSongs(data);
      setStatus("ready");
    }

    void loadSongs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Chord Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900">
              Saved Songs
            </h1>
          </div>
          <Link
            className="rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            to="/new"
          >
            New Song
          </Link>
        </div>

        <Link className="text-sm font-medium text-stone-600 hover:text-stone-900" to="/">
          Back to home
        </Link>

        {status === "loading" && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-600 shadow-sm">
            Loading songs...
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            Could not load songs.
          </div>
        )}

        {status === "ready" && songs.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-600 shadow-sm">
            No songs saved yet.
          </div>
        )}

        {status === "ready" && songs.length > 0 && (
          <ul className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            {songs.map((song) => (
              <li
                key={song.id}
                className="border-b border-stone-200 last:border-b-0"
              >
                <Link
                  className="block px-6 py-4 transition hover:bg-stone-50"
                  to={`/songs/${song.id}`}
                >
                  <div className="text-base font-medium text-stone-900">
                    Song {song.id.slice(0, 8)}
                  </div>
                  <div className="mt-1 text-sm text-stone-500">
                    Created {formatCreatedAt(song.created_at)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
