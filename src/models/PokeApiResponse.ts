export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  // In dm (17 = 1.7m), needs to be transformed.
  weight: number;
  // In hm (69 = 6.9kg), needs to be transformed.
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      home: {
        front_default: string | null;
        // If for whatever reason home images aren't available we will default to official artwork.
      };
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}
