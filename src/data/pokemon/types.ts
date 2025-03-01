import { PokemonType, VersionedProperty } from "@/data/types";
import { PokemonVersionGroups } from "@/data/versions";

export interface Abilities {
  slot1: string;
  slot2?: string;
  hidden?: string;
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface LegacyStats {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
}

interface PokemonCommon {
  name: string;
  displayName: string;
  availableIn: PokemonVersionGroups[];
}

export interface PokemonMode extends PokemonCommon {
  sprite: string;
  isDefault: boolean;
  types: VersionedProperty<[PokemonType] | [PokemonType, PokemonType]>;
  baseStats: VersionedProperty<Stats | LegacyStats>;
  abilities: VersionedProperty<Abilities>;
}

export interface PokemonSpecies extends PokemonCommon {
  nationalDexNumber: number;
}

export interface Pokemon extends PokemonCommon {
  species: PokemonSpecies;
  modes: PokemonMode[];
}
