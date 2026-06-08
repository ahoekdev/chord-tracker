export function Chord({ name }: { name: string }) {
  return (
    <span className="rounded-md border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-800">
      {name}
    </span>
  );
}
