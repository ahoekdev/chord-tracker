import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Section } from "~/components/Section/Section";
import { supabase } from "~/lib/supabase";
import type { Section as SongSection } from "~/types";

type SongRecord = {
  id: string;
  created_at: string | null;
  sections: SongSection[];
};

const createdAtFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function meta() {
  return [
    { title: "Song | Chord Tracker" },
    { name: "description", content: "Read-only song view in Chord Tracker" },
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

export default function SongView() {
  const { songId } = useParams();
  const [song, setSong] = useState<SongRecord | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSong() {
      if (!songId) {
        setStatus("error");
        return;
      }

      const { data, error } = await supabase
        .from("songs")
        .select("id, created_at, sections")
        .eq("id", songId)
        .single();

      if (!isMounted) {
        return;
      }

      if (error || !data) {
        setStatus("error");
        return;
      }

      setSong(data as SongRecord);
      setStatus("ready");
    }

    void loadSong();

    return () => {
      isMounted = false;
    };
  }, [songId]);

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Chord Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900">
              Song {songId?.slice(0, 8)}
            </h1>
            {song && (
              <p className="mt-2 text-sm text-stone-500">
                Created {formatCreatedAt(song.created_at)}
              </p>
            )}
          </div>
          <Link
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-50"
            to="/songs"
          >
            Back to songs
          </Link>
        </div>

        {status === "loading" && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-600 shadow-sm">
            Loading song...
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            Could not load song.
          </div>
        )}

        {status === "ready" && song && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {song.sections.map(({ id, name, measureGroups }) => (
                <Section
                  key={id}
                  measureGroups={measureGroups}
                  name={name}
                  onRename={() => {}}
                  readOnly
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
