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
  loadPokemon,
} from "@/lib/pokemon/utils";

async function ensureDirectories(
  versionId: string,
  gameId: string,
): Promise<void> {
  await fs.mkdir(path.join(LOCATION_OUTPUT_PATH, versionId, gameId), {
    recursive: true,
  });
}

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
                pokemon: pokemonOutput,
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

      for (const [game, gameData] of gamesInVersionGroup) {
        const locations: LocationOutput[] = [];

        for (const [location, encounters] of encounterMap) {
          locations.push({
            id: PokemonLocationData[location].id,
            encounters: encounters.filter(
              (e) => !e.exclusiveTo || e.exclusiveTo.includes(game),
            ),
          });
        }

        for (const location of locations) {
          await ensureDirectories(versionData.id, gameData.id);
          await fs.writeFile(
            path.join(
              LOCATION_OUTPUT_PATH,
              versionData.id,
              gameData.id,
              `${location.id}.json`,
            ),
            JSON.stringify(location, null, 4),
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
