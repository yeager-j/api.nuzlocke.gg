import { Evolution, VersionedEvolution } from "@/data/evolution/types";
import { Encounter } from "@/data/locations/types";
import {
  PokemonFormName,
  PokemonModeName,
  PokemonSpeciesName,
} from "@/data/pokemon/names";
import { PokemonTypes, VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";

interface PokemonCommon<T extends string> {
  name: T;
  displayName: string;
  availableIn: PokemonVersionGroup[];
}

export interface PokemonMode extends PokemonCommon<PokemonModeName> {
  sprite: string;
  isDefault: boolean;
  types: VersionedProperty<PokemonTypes>;
}

export interface VersionedPokemonMode
  extends Omit<PokemonMode, "types" | "availableIn"> {
  types: PokemonTypes;
}

export interface PokemonSpecies extends PokemonCommon<PokemonSpeciesName> {
  nationalDexNumber: number;
}

export type VersionedPokemonSpecies = Omit<PokemonSpecies, "availableIn">;

export interface Pokemon extends PokemonCommon<PokemonFormName> {
  modes: PokemonMode[];
  isDefault: boolean;
  evolution: Evolution;
  encounters: VersionedProperty<Encounter[]>;
}

export interface VersionedPokemon
  extends Omit<Pokemon, "evolution" | "encounters" | "modes" | "availableIn"> {
  modes: VersionedPokemonMode[];
  evolution: VersionedEvolution;
  encounters: Encounter[];
}

export interface PokemonDefinition {
  species: PokemonSpecies;
  forms: Pokemon[];
}
