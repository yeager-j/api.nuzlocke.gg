import {
  PokemonSpecies,
  VersionedPokemon,
  VersionedPokemonMode,
} from "@/data/pokemon/types";

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
