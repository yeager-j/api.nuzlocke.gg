import { EncounterMethod } from "@/data/locations/common";
import {
  PokemonSpecies,
  VersionedPokemon,
  VersionedPokemonMode,
} from "@/data/pokemon/types";
import { PokemonGame } from "@/data/versions";

export interface PokemonSpeciesOutput
  extends Omit<PokemonSpecies, "availableIn"> {
  forms: (Omit<VersionedPokemon, "availableIn"> & {
    modes: Omit<VersionedPokemonMode, "availableIn">[];
  })[];
}

export interface PokemonOutput extends VersionedPokemon {
  modes: VersionedPokemonMode[];
  species: Omit<PokemonSpecies, "availableIn">;
}

export interface PokemonEncounter {
  pokemon: PokemonOutput;
  method: EncounterMethod;
  exclusiveTo?: PokemonGame;
}

export interface LocationOutput {
  id: string;
  encounters: PokemonEncounter[];
}
