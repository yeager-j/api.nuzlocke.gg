import fs from "fs/promises";
import path from "path";

import { PokemonLocationData } from "@/data/locations/common";
import { PokemonLocation } from "@/data/locations/types";
import { PokemonDefinition } from "@/data/pokemon/types";
import { PokemonGameMetadata } from "@/data/types";
import {
  PokemonGame,
  PokemonGameData,
  PokemonVersionGroup,
  PokemonVersionGroupData,
} from "@/data/versions";
import { LOCATION_OUTPUT_PATH, POKEMON_DATA_PATH } from "@/lib/pokemon/common";
import {
  LocationOutput,
  PokemonEncounter,
  PokemonOutput,
} from "@/lib/pokemon/types";
import {
  applyVersionToPokemon,
  applyVersionToSpecies,
  getPokemonListItem,
  loadPokemon,
} from "@/lib/pokemon/utils";

async function ensureDirectories(gameId: string): Promise<void> {
  await fs.mkdir(path.join(LOCATION_OUTPUT_PATH, gameId), {
    recursive: true,
  });
}

/**
 * Builds and generates location-specific JSON data for Pokémon based on various game versions and generations.
 * This function processes Pokémon data, applies version transformations, maps encounters to locations,
 * and writes JSON output files for each game and version group in the specified output directory.
 *
 * @return {Promise<void>} A promise that resolves when the location JSON data generation is complete, or rejects if an error occurs.
 */
export async function buildLocationApi(): Promise<void> {
  console.log("Starting location JSON generation...");

  try {
    const generations = await fs.readdir(POKEMON_DATA_PATH);
    const pokemonDefinitions: PokemonDefinition[] = [];

    for (const generation of generations) {
      console.log("Collecting Pokemon data from generation: ", generation);
      const pokemonFiles = await fs.readdir(
        path.join(POKEMON_DATA_PATH, generation),
      );

      const pokemonPromises = pokemonFiles.map(async (pokemonFile) => {
        return loadPokemon(generation, pokemonFile);
      });

      const pokemonData = await Promise.all(pokemonPromises);
      pokemonDefinitions.push(...pokemonData);
    }

    for (const version of Object.values(PokemonVersionGroup)) {
      console.log("Processing version: ", version);

      const versionData = PokemonVersionGroupData[version];
      const encounterMap: Map<PokemonLocation, PokemonEncounter[]> = new Map();

      for (const definition of pokemonDefinitions) {
        for (const pokemon of definition.forms) {
          const versionedPokemon = applyVersionToPokemon(pokemon, version);
          const versionedSpecies = applyVersionToSpecies(definition.species);

          const pokemonOutput: PokemonOutput = {
            ...versionedPokemon,
            species: versionedSpecies,
          };

          versionedPokemon.encounters
            .filter((e) => e.method !== "EVOLVE")
            .forEach((e) => {
              const encounters = encounterMap.get(e.location) || [];
              encounters.push({
                pokemon: getPokemonListItem(pokemonOutput),
                method: e.method,
                exclusiveTo: e.exclusiveTo,
              });
              encounterMap.set(e.location, encounters);
            });
        }
      }

      const gamesInVersionGroup = Object.entries(PokemonGameData).filter(
        ([, gameData]) => gameData.versionGroup.includes(version),
      ) as [PokemonGame, PokemonGameMetadata][];

      console.log("Writing location JSON for version: ", version);
      for (const [game, gameData] of gamesInVersionGroup) {
        const locations: LocationOutput[] = [];

        for (const [location, encounters] of encounterMap) {
          locations.push({
            id: PokemonLocationData[location].id,
            name: PokemonLocationData[location].name,
            encounters: encounters.filter(
              (e) => !e.exclusiveTo || e.exclusiveTo.includes(game),
            ),
          });
        }

        for (const location of locations) {
          await ensureDirectories(gameData.id);
          await fs.writeFile(
            path.join(LOCATION_OUTPUT_PATH, gameData.id, `${location.id}.json`),
            JSON.stringify(location),
          );
        }
      }
    }

    console.log("Location JSON generation complete!");
  } catch (error) {
    console.error("Error generating location JSON:", error);
    throw error;
  }
}
