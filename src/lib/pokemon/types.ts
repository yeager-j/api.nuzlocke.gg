import { EncounterMethod } from "@/data/locations/common";
import {
  PokemonSpecies,
  VersionedPokemon,
  VersionedPokemonMode,
  VersionedPokemonSpecies,
} from "@/data/pokemon/types";
import { PokemonGame } from "@/data/versions";

export interface PokemonSpeciesOutput extends VersionedPokemonSpecies {
  forms: (Omit<VersionedPokemon, "availableIn"> & {
    modes: Omit<VersionedPokemonMode, "availableIn">[];
  })[];
}

export interface PokemonOutput extends VersionedPokemon {
  modes: VersionedPokemonMode[];
  species: Omit<PokemonSpecies, "availableIn">;
}

export type PokemonListItem = Pick<
  PokemonOutput,
  "name" | "displayName" | "evolution" | "isDefault"
> &
  Pick<VersionedPokemonMode, "sprite" | "types"> &
  Pick<VersionedPokemonSpecies, "nationalDexNumber">;

export type PokemonSpeciesListItem = Pick<
  PokemonSpeciesOutput,
  "name" | "displayName" | "nationalDexNumber"
> &
  Pick<PokemonOutput, "evolution"> &
  Pick<VersionedPokemonMode, "types" | "sprite">;

export interface PokemonEncounter {
  pokemon: PokemonListItem;
  method: EncounterMethod;
  exclusiveTo?: PokemonGame;
}

export interface LocationOutput {
  id: string;
  name: string;
  encounters: PokemonEncounter[];
}
