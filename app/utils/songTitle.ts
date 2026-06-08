const fallbackSongTitle = "Untitled song";

export function normalizeSongTitle(title: string) {
  const normalized = title.trim();

  return normalized.length > 0 ? normalized : null;
}

export function displaySongTitle(title: string | null | undefined) {
  return title && title.trim().length > 0 ? title : fallbackSongTitle;
}
