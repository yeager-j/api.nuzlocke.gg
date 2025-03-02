import fs from "fs/promises";
import path from "path";

import { PokemonDefinition } from "@/data/pokemon/types";
import { PokemonVersionGroup, PokemonVersionGroupData } from "@/data/versions";
import { POKEMON_DATA_PATH, POKEMON_OUTPUT_PATH } from "@/lib/pokemon/common";
import { PokemonOutput, PokemonSpeciesOutput } from "@/lib/pokemon/types";
import {
  applyVersionToPokemon,
  applyVersionToSpecies,
} from "@/lib/pokemon/utils";

/**
 * Asynchronously loads a Pokémon definition file based on the specified generation and master file name.
 *
 * @param {string} generation - The Pokémon generation to load data for.
 * @param {string} masterFile - The name of the master file containing Pokémon definitions.
 * @return {Promise<PokemonDefinition>} A promise that resolves to the loaded Pokémon definition.
 */
async function loadPokemon(
  generation: string,
  masterFile: string,
): Promise<PokemonDefinition> {
  const { default: pokemon } = await import(
    path.join(POKEMON_DATA_PATH, generation, masterFile)
  );
  return pokemon;
}

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
 * Processes the given Pokémon data for a specific version by filtering and applying version-specific data to the species and its forms,
 * ensuring that all necessary data is written to the appropriate files and directories.
 *
 * @param {PokemonDefinition} pokemon The definition of the Pokémon including its species and forms.
 * @param {PokemonVersionGroup} version The specific version group for which the Pokémon data should be processed.
 * @return {Promise<void>} A promise that resolves when the processing and file writing are complete.
 */
export async function processPokemonForVersion(
  pokemon: PokemonDefinition,
  version: PokemonVersionGroup,
): Promise<void> {
  // Skip if Pokemon isn't available in this version
  if (!pokemon.species.availableIn.includes(version)) {
    return;
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

  // Write all form files in parallel
  await Promise.all(
    versionedForms.map((form) => {
      const formOutput = {
        ...form,
        species: versionedSpecies,
      };
      return writeFormFile(versionData.id, formOutput);
    }),
  );
}

/**
 * Generates JSON data for all Pokemon across generations and versions.
 * This process reads Pokemon data from file, processes each generation,
 * and handles all versions of each Pokemon in parallel.
 *
 * @return {Promise<void>} A promise that resolves when the JSON generation process is complete.
 */
export async function generatePokemonJson(): Promise<void> {
  console.log("Starting Pokemon JSON generation...");

  try {
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
          (version) => processPokemonForVersion(pokemon, version),
        );

        await Promise.all(versionPromises);
      });

      // Process all Pokemon in this generation in parallel
      await Promise.all(pokemonPromises);
    }

    console.log("Pokemon JSON generation complete!");
  } catch (error) {
    console.error("Error generating Pokemon JSON:", error);
    throw error;
  }
}
