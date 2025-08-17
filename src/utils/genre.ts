export const getPrimaryGenre = (genres: { id: number; name: string }[]) => {
  const priorityGenres = [878, 16, 28, 14];

  for (const genreId of priorityGenres) {
    const found = genres.find((g) => g.id === genreId);
    if (found) return found;
  }
  return genres[0] || { id: 0, name: "General" };
};
