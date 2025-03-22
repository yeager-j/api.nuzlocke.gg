import fs from "fs/promises";
import path from "path";

import { PokemonDefinition } from "@/data/pokemon/types";
import { PokemonVersionGroup, PokemonVersionGroupData } from "@/data/versions";
import { POKEMON_DATA_PATH, POKEMON_OUTPUT_PATH } from "@/lib/pokemon/common";
import {
  PokemonListItem,
  PokemonOutput,
  PokemonSpeciesListItem,
  PokemonSpeciesOutput,
} from "@/lib/pokemon/types";
import {
  applyVersionToPokemon,
  applyVersionToSpecies,
  getPokemonListItem,
  getPokemonSpeciesListItem,
  loadPokemon,
} from "@/lib/pokemon/utils";

type VersionPokedexMap<T> = Map<PokemonVersionGroup, T[]>;

/**
 * Ensures that the required directories for species and forms exist within the specified version directory.
 * If the directories do not exist, they will be created recursively.
 *
 * @param {string} versionId - The identifier for the version whose directories need to be ensured.
 * @return {Promise<void>} A promise that resolves once the directories are ensured or created as needed.
 */
async function ensureDirectories(versionId: string): Promise<void> {
  await fs.mkdir(path.join(POKEMON_OUTPUT_PATH, versionId, "species"), {
    recursive: true,
  });
  await fs.mkdir(path.join(POKEMON_OUTPUT_PATH, versionId, "forms"), {
    recursive: true,
  });
  await fs.mkdir(path.join(POKEMON_OUTPUT_PATH, versionId, "lists"), {
    recursive: true,
  });
}

/**
 * Writes a Pokémon species data file in JSON format to a specified path.
 *
 * @param {string} versionId - The identifier for the version directory where the file will be saved.
 * @param {PokemonSpeciesOutput} speciesOutput - The Pokémon species data to be written to the file.
 * @return {Promise<void>} A promise that resolves when the file is successfully written.
 */
async function writeSpeciesFile(
  versionId: string,
  speciesOutput: PokemonSpeciesOutput,
): Promise<void> {
  await fs.writeFile(
    path.join(
      POKEMON_OUTPUT_PATH,
      versionId,
      "species",
      `${speciesOutput.name}.json`,
    ),
    JSON.stringify(speciesOutput),
  );
}

/**
 * Writes a JSON file containing form output data for a specific Pokémon version.
 *
 * @param {string} versionId - The identifier of the Pokémon version.
 * @param {PokemonOutput} formOutput - The data of the form to be written to the file.
 * @return {Promise<void>} A promise that resolves when the file has been successfully written.
 */
async function writeFormFile(
  versionId: string,
  formOutput: PokemonOutput,
): Promise<void> {
  await fs.writeFile(
    path.join(
      POKEMON_OUTPUT_PATH,
      versionId,
      "forms",
      `${formOutput.name}.json`,
    ),
    JSON.stringify(formOutput),
  );
}

/**
 * Processes a Pokemon for a specific version by applying version-specific data to its species and forms,
 * ensuring the required directories exist, writing output files, and returning the processed data.
 *
 * @param {PokemonDefinition} pokemon - The definition of the Pokemon to process, including forms and species data.
 * @param {PokemonVersionGroup} version - The version group for which the Pokemon data should be processed.
 * @return {Promise<{speciesOutput: PokemonSpeciesOutput | null, formOutputs: PokemonOutput[]}>} A promise that resolves to an object containing the processed species and forms, or null if the Pokemon isn't available in this version.
 */
export async function processPokemonForVersion(
  pokemon: PokemonDefinition,
  version: PokemonVersionGroup,
): Promise<{
  speciesOutput: PokemonSpeciesOutput | null;
  formOutputs: PokemonOutput[] | null;
}> {
  // Skip if Pokemon isn't available in this version
  if (!pokemon.species.availableIn.includes(version)) {
    return { speciesOutput: null, formOutputs: null };
  }

  const versionData = PokemonVersionGroupData[version];
  const versionedSpecies = applyVersionToSpecies(pokemon.species);

  const versionedForms = pokemon.forms
    .filter((form) => form.availableIn.includes(version))
    .map((form) => applyVersionToPokemon(form, version));

  // Ensure directories exist
  await ensureDirectories(versionData.id);

  const speciesOutput = {
    ...versionedSpecies,
    forms: versionedForms,
  };

  // Write species file
  await writeSpeciesFile(versionData.id, speciesOutput);

  // Process and write all form files in parallel
  const formOutputs: PokemonOutput[] = [];
  await Promise.all(
    versionedForms.map((form) => {
      const formOutput = {
        ...form,
        species: versionedSpecies,
      };

      formOutputs.push(formOutput);
      return writeFormFile(versionData.id, formOutput);
    }),
  );

  return { speciesOutput, formOutputs };
}

/**
 * Generates JSON data for all Pokemon across generations and versions.
 * This process reads Pokemon data from file, processes each generation,
 * and handles all versions of each Pokemon in parallel.
 *
 * @return {Promise<void>} A promise that resolves when the JSON generation process is complete.
 */
export async function buildPokemonApi(): Promise<void> {
  console.log("Starting Pokemon JSON generation...");

  try {
    const versionFormListMap: VersionPokedexMap<PokemonListItem> = new Map();
    const versionSpeciesListMap: VersionPokedexMap<PokemonSpeciesListItem> =
      new Map();

    // Get all generations
    const generations = await fs.readdir(POKEMON_DATA_PATH);
    console.log(`Found ${generations.length} generations`);

    // Process each generation
    for (const generation of generations) {
      const pokemonFiles = await fs.readdir(
        path.join(POKEMON_DATA_PATH, generation),
      );

      console.log(
        `Processing ${pokemonFiles.length} Pokemon from ${generation}`,
      );

      // Process each Pokemon in this generation
      const pokemonPromises = pokemonFiles.map(async (pokemonFile) => {
        const pokemon = await loadPokemon(generation, pokemonFile);

        // Process all versions in parallel for this Pokemon
        const versionPromises = Object.values(PokemonVersionGroup).map(
          async (version) => {
            const { speciesOutput, formOutputs } =
              await processPokemonForVersion(pokemon, version);

            // Only add to maps if data was processed
            if (speciesOutput) {
              // Add to species map
              const speciesList = versionSpeciesListMap.get(version) || [];
              speciesList.push(getPokemonSpeciesListItem(speciesOutput));
              versionSpeciesListMap.set(version, speciesList);
            }

            if (formOutputs) {
              // Add to form map
              const formList = versionFormListMap.get(version) || [];
              formList.push(...formOutputs.map(getPokemonListItem));
              versionFormListMap.set(version, formList);
            }
          },
        );

        await Promise.all(versionPromises);
      });

      // Process all Pokemon in this generation in parallel
      await Promise.all(pokemonPromises);
    }

    // Write the form lists
    for (const [version, pokedex] of versionFormListMap) {
      const sortedByNatDex = pokedex.sort(
        (a, b) => a.nationalDexNumber - b.nationalDexNumber,
      );

      await fs.writeFile(
        path.join(
          POKEMON_OUTPUT_PATH,
          PokemonVersionGroupData[version].id,
          "lists",
          "by-form.json",
        ),
        JSON.stringify(sortedByNatDex),
      );
    }

    // Write the species lists
    for (const [version, pokedex] of versionSpeciesListMap) {
      const sortedByNatDex = pokedex.sort(
        (a, b) => a.nationalDexNumber - b.nationalDexNumber,
      );

      await fs.writeFile(
        path.join(
          POKEMON_OUTPUT_PATH,
          PokemonVersionGroupData[version].id,
          "lists",
          "by-species.json",
        ),
        JSON.stringify(sortedByNatDex),
      );
    }

    console.log("Pokemon JSON generation complete!");
  } catch (error) {
    console.error("Error generating Pokemon JSON:", error);
    throw error;
  }
}
