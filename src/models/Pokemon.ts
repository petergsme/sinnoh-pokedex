export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
}
