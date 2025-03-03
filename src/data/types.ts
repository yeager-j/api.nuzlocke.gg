import { PokemonVersionGroup } from "@/data/versions";

export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Electric"
  | "Grass"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel"
  | "Fairy";

export interface VersionedProperty<T> {
  default: T;
  versions: {
    appliesTo: PokemonVersionGroup[];
    value: T;
  }[];
}

export interface VersionGroupMetadata {
  id: string;
  name: string;
  order: number;
}

export interface PokemonGameMetadata {
  id: string;
  name: string;
  versionGroup: PokemonVersionGroup;
}
