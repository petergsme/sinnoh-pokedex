export interface PokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}
