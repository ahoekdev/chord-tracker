const chords = new Set<string>(["A", "B", "C", "D", "E", "F", "G"]);

export function getChordFromKey(key: string): string | null {
  if (chords.has(key.toUpperCase())) {
    return key.toUpperCase();
  }

  return null;
}
