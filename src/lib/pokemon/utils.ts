import {
  Pokemon,
  PokemonMode,
  PokemonSpecies,
  VersionedPokemon,
  VersionedPokemonMode,
  VersionedPokemonSpecies,
} from "@/data/pokemon/types";
import { VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";

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
  };
}

export function applyVersionToSpecies(
  pokemonSpecies: PokemonSpecies,
  _version: PokemonVersionGroup,
): VersionedPokemonSpecies {
  return {
    name: pokemonSpecies.name,
    displayName: pokemonSpecies.displayName,
    nationalDexNumber: pokemonSpecies.nationalDexNumber,
  };
}
