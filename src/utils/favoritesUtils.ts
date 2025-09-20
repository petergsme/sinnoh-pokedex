export const getFavorites = (): number[] => {
  const saved = localStorage.getItem('favorites');
  if (saved) {
    return JSON.parse(saved);
  } else {
    return [];
  }
};

export const isPokemonFavorite = (pokemonId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(pokemonId);
};
