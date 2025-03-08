import path from "path";
import cloneDeep from "lodash-es/cloneDeep";
import { vol } from "memfs";
import { bench, describe, vi } from "vitest";

import mockBulbasaur from "../__fixtures__/mock-bulbasaur";
import mockSquirtle from "../__fixtures__/mock-squirtle";

import { PokemonDefinition } from "@/data/pokemon/types";
import { buildPokemonApi } from "@/lib/pokemon/build-pokemon-api";
import { POKEMON_DATA_PATH } from "@/lib/pokemon/common";
import mockCaterpie from "@/lib/pokemon/tests/__fixtures__/mock-caterpie";
import mockCharizard from "@/lib/pokemon/tests/__fixtures__/mock-charizard";
import mockCharmander from "@/lib/pokemon/tests/__fixtures__/mock-charmander";
import { loadPokemon } from "@/lib/pokemon/utils";

vi.mock("fs/promises");
vi.mock("@/lib/pokemon/utils", async () => {
  const actual = await vi.importActual("@/lib/pokemon/utils");
  return {
    ...actual,
    loadPokemon: vi.fn(),
  };
});

describe("Build Performance Scaling", () => {
  // Test different scales
  [10, 50, 100, 200, 500, 1000].forEach((pokemonCount) => {
    bench(
      `Building ${pokemonCount} Pokémon`,
      async () => {
        vol.mkdirSync(path.join(POKEMON_DATA_PATH, "generation-1"), {
          recursive: true,
        });

        // Create a mapping of synthetic filenames to data
        const syntheticPokemon: { [key: string]: PokemonDefinition } = {};
        const basePokemon = [
          mockBulbasaur,
          mockCharmander,
          mockSquirtle,
          mockCharizard,
          mockCaterpie,
        ];

        for (let i = 0; i < pokemonCount; i++) {
          const baseIndex = i % basePokemon.length;
          // We have to clone the object so we can add additional forms. Otherwise, forms grow exponentially. Don't ask how I know this.
          const base = cloneDeep(basePokemon[baseIndex]);
          const id = i + 1;
          const fileName = `${id}-${base.species.name}-synthetic-${Math.floor(i / 5)}.ts`;

          const has1ExtraForm = i % 20 === 0; // 1 in 20 Pokémon have a second form
          const has2ExtraForms = i % 200 === 0; // 1 in 200 Pokémon have a third form

          const baseForm = base.forms[0];

          if (has1ExtraForm) {
            base.forms.push({
              ...baseForm,
              name: "moltres-galar",
              displayName: "Galarian Moltres",
            });
          }

          if (has2ExtraForms) {
            base.forms.push({
              ...baseForm,
              name: "zapdos-galar",
              displayName: "Galarian Zapdos",
            });
          }

          syntheticPokemon[fileName] = base;
          vol.writeFileSync(
            path.join(POKEMON_DATA_PATH, "generation-1", fileName),
            `export default ${JSON.stringify(base)}`,
          );
        }

        // Create a dynamic mock implementation based on scale
        vi.mocked(loadPokemon).mockImplementation(async (_, pokemonFile) => {
          // Return original mocks for the standard test files
          if (pokemonFile === "1-bulbasaur.ts") return mockBulbasaur;
          if (pokemonFile === "4-charmander.ts") return mockCharmander;
          if (pokemonFile === "6-charizard.ts") return mockCharizard;
          if (pokemonFile === "7-squirtle.ts") return mockSquirtle;
          if (pokemonFile === "10-caterpie.ts") return mockCaterpie;

          // Return synthetic data for generated filenames
          if (syntheticPokemon[pokemonFile]) {
            return syntheticPokemon[pokemonFile];
          }

          throw new Error(`Unexpected pokemon file: ${pokemonFile}`);
        });

        await buildPokemonApi();
      },
      {
        iterations: 5, // Run multiple iterations for statistical significance
        warmupIterations: 1, // One warmup to avoid cold-start bias
      },
    );
  });
});
