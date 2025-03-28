import path from "path";
import pick from "lodash-es/pick";

import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
  VersionedPokemon,
  VersionedPokemonMode,
  VersionedPokemonSpecies,
} from "@/data/pokemon/types";
import { VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";
import { POKEMON_DATA_PATH } from "@/lib/pokemon/common";
import {
  PokemonListItem,
  PokemonOutput,
  PokemonSpeciesListItem,
  PokemonSpeciesOutput,
} from "@/lib/pokemon/types";

/**
 * Asynchronously loads a Pokémon definition file based on the specified generation and master file name.
 *
 * @param {string} generation - The Pokémon generation to load data for.
 * @param {string} masterFile - The name of the master file containing Pokémon definitions.
 * @return {Promise<PokemonDefinition>} A promise that resolves to the loaded Pokémon definition.
 */
export async function loadPokemon(
  generation: string,
  masterFile: string,
): Promise<PokemonDefinition> {
  const { default: pokemon } = await import(
    path.join(POKEMON_DATA_PATH, generation, masterFile)
  );
  return pokemon;
}

/**
 * Retrieves the data corresponding to the specified version from the provided
 * versioned property. If no data matches the given version, the default value
 * is returned.
 *
 * @param {VersionedProperty<T>} data - The versioned property containing data for different versions.
 * @param {PokemonVersionGroup} version - The specific version group to retrieve data for.
 * @return {T} - The data corresponding to the specified version, or the default value if no match is found.
 */
export function getVersionedData<T>(
  data: VersionedProperty<T>,
  version: PokemonVersionGroup,
): T {
  if (data.versions.filter((v) => v.appliesTo.includes(version)).length > 1) {
    console.warn(
      "Multiple versions match the specified version group:",
      version,
    );
  }

  const versionedData = data.versions.find((v) =>
    v.appliesTo.includes(version),
  );

  if (!versionedData) {
    return data.default;
  }

  return versionedData.value;
}

/**
 * Applies the specified version to the provided Pokemon mode, adjusting its types accordingly.
 *
 * @param {PokemonMode} pokemonMode - The Pokemon mode object containing the current configuration of the Pokemon.
 * @param {PokemonVersionGroup} version - The version group to apply to the Pokemon mode, determining version-specific adjustments.
 * @return {VersionedPokemonMode} A new Pokemon mode object with types adapted to the specified version.
 */
export function applyVersionToPokemonMode(
  pokemonMode: PokemonMode,
  version: PokemonVersionGroup,
): VersionedPokemonMode {
  return {
    name: pokemonMode.name,
    displayName: pokemonMode.displayName,
    sprite: pokemonMode.sprite,
    isDefault: pokemonMode.isDefault,
    types: getVersionedData(pokemonMode.types, version),
  };
}

/**
 * Applies a specific version group to a Pokémon form and updates its properties accordingly.
 *
 * @param {Pokemon} pokemonForm - The Pokémon form object to which the version group changes will be applied.
 * @param {PokemonVersionGroup} version - The specific version group used to modify the Pokémon form's data.
 * @return {VersionedPokemon} A new Pokémon object with the version group applied, containing updated evolutionary branches.
 */
export function applyVersionToPokemon(
  pokemonForm: Pokemon,
  version: PokemonVersionGroup,
): VersionedPokemon {
  return {
    name: pokemonForm.name,
    displayName: pokemonForm.displayName,
    isDefault: pokemonForm.isDefault,
    modes: pokemonForm.modes
      .filter((mode) => mode.availableIn.includes(version))
      .map((mode) => applyVersionToPokemonMode(mode, version)),
    evolution: {
      ...pokemonForm.evolution,
      evolutionBranches: getVersionedData(
        pokemonForm.evolution.evolutionBranches,
        version,
      ),
    },
    encounters: getVersionedData(pokemonForm.encounters, version),
  };
}

export function applyVersionToSpecies(
  pokemonSpecies: PokemonSpecies,
): VersionedPokemonSpecies {
  return {
    name: pokemonSpecies.name,
    displayName: pokemonSpecies.displayName,
    nationalDexNumber: pokemonSpecies.nationalDexNumber,
  };
}

/**
 * Converts a PokemonOutput object into a simplified PokemonListItem object.
 *
 * @param {PokemonOutput} pokemon - The Pokemon data object to transform.
 * @return {PokemonListItem} A simplified object containing key information about the Pokemon.
 * @throws {Error} If no default mode is found for the Pokemon.
 */
export function getPokemonListItem(pokemon: PokemonOutput): PokemonListItem {
  const defaultMode = pokemon.modes.find((m) => m.isDefault);

  if (!defaultMode) {
    throw new Error("No default mode found for Pokemon");
  }

  return {
    ...pick(pokemon, ["name", "displayName", "evolution", "isDefault"]),
    sprite: defaultMode.sprite,
    types: defaultMode.types,
    nationalDexNumber: pokemon.species.nationalDexNumber,
  };
}

/**
 * Converts a `PokemonSpeciesOutput` object into a simplified `PokemonSpeciesListItem` object.
 *
 * @param {PokemonSpeciesOutput} pokemon - The Pokemon species data containing forms, modes, and other details.
 * @return {PokemonSpeciesListItem} A simplified object containing essential properties like name, sprite, types, and others.
 * @throws {Error} Throws an error if no default form or default mode is found for the provided Pokemon species.
 */
export function getPokemonSpeciesListItem(
  pokemon: PokemonSpeciesOutput,
): PokemonSpeciesListItem {
  const defaultForm = pokemon.forms.find((f) => f.isDefault);

  if (!defaultForm) {
    throw new Error("No default form found for Pokemon species");
  }

  const defaultMode = defaultForm.modes.find((m) => m.isDefault);

  if (!defaultMode) {
    throw new Error("No default mode found for Pokemon");
  }

  return {
    ...pick(pokemon, ["name", "displayName", "nationalDexNumber"]),
    sprite: defaultMode.sprite,
    types: defaultMode.types,
    evolution: defaultForm.evolution,
  };
}
