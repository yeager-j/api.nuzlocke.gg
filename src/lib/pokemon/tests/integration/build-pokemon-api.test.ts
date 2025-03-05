import path from "path";
import { vol } from "memfs";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { buildPokemonApi } from "@/lib/pokemon/build-pokemon-api";
import { POKEMON_DATA_PATH, POKEMON_OUTPUT_PATH } from "@/lib/pokemon/common";
import mockBulbasaur from "@/lib/pokemon/tests/__fixtures__/mock-bulbasaur";
import mockCharmander from "@/lib/pokemon/tests/__fixtures__/mock-charmander";
import mockSquirtle from "@/lib/pokemon/tests/__fixtures__/mock-squirtle";
import { loadPokemon } from "@/lib/pokemon/utils";

vi.mock("fs/promises");
vi.mock("@/lib/pokemon/utils", async () => {
  const actual = await vi.importActual("@/lib/pokemon/utils");
  return {
    ...actual,
    loadPokemon: vi.fn(),
  };
});

describe("buildPokemonApi integration", () => {
  beforeEach(async () => {
    vol.reset();

    vol.mkdirSync(path.join(POKEMON_DATA_PATH, "generation-1"), {
      recursive: true,
    });

    vol.writeFileSync(
      path.join(POKEMON_DATA_PATH, "generation-1", "1-bulbasaur.ts"),
      "",
    );

    vol.writeFileSync(
      path.join(POKEMON_DATA_PATH, "generation-1", "4-charmander.ts"),
      "",
    );

    vol.writeFileSync(
      path.join(POKEMON_DATA_PATH, "generation-1", "7-squirtle.ts"),
      "",
    );

    vi.mocked(loadPokemon).mockImplementation(async (_, pokemonFile) => {
      switch (pokemonFile) {
        case "1-bulbasaur.ts":
          return mockBulbasaur;
        case "4-charmander.ts":
          return mockCharmander;
        case "7-squirtle.ts":
          return mockSquirtle;
        default:
          throw new Error(`Unexpected pokemon file: ${pokemonFile}`);
      }
    });
  });

  test("correct file structure should exist", async () => {
    await buildPokemonApi();

    // Verify directory structure was created
    expect(
      vol.existsSync(path.join(POKEMON_OUTPUT_PATH, "red-blue", "species")),
    ).toBe(true);
    expect(
      vol.existsSync(path.join(POKEMON_OUTPUT_PATH, "red-blue", "forms")),
    ).toBe(true);
    expect(
      vol.existsSync(path.join(POKEMON_OUTPUT_PATH, "red-blue", "lists")),
    ).toBe(true);

    // Verify JSON was output
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "lists", "by-species.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "lists", "by-form.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "species", "bulbasaur.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(
          POKEMON_OUTPUT_PATH,
          "red-blue",
          "species",
          "charmander.json",
        ),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "species", "squirtle.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "forms", "bulbasaur.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "forms", "charmander.json"),
      ),
    ).toBe(true);
    expect(
      vol.existsSync(
        path.join(POKEMON_OUTPUT_PATH, "red-blue", "forms", "squirtle.json"),
      ),
    ).toBe(true);
  });

  test("should build the list files", async () => {
    await buildPokemonApi();

    const speciesListJson = vol.readFileSync(
      path.join(POKEMON_OUTPUT_PATH, "red-blue", "lists", "by-species.json"),
      "utf8",
    );

    const formListJson = vol.readFileSync(
      path.join(POKEMON_OUTPUT_PATH, "red-blue", "lists", "by-form.json"),
      "utf8",
    );

    expect(JSON.parse(speciesListJson.toString())).toMatchSnapshot(
      "species-list-rb",
    );
    expect(JSON.parse(formListJson.toString())).toMatchSnapshot("form-list-rb");
  });

  test.for(["bulbasaur", "charmander", "squirtle"])(
    "should build %s",
    async (pokemonName, { expect }) => {
      await buildPokemonApi();

      const speciesJson = vol.readFileSync(
        path.join(
          POKEMON_OUTPUT_PATH,
          "red-blue",
          "species",
          `${pokemonName}.json`,
        ),
        "utf8",
      );

      const formJson = vol.readFileSync(
        path.join(
          POKEMON_OUTPUT_PATH,
          "red-blue",
          "forms",
          `${pokemonName}.json`,
        ),
        "utf8",
      );

      expect(JSON.parse(speciesJson.toString())).toMatchSnapshot(
        `${pokemonName}-species-rb`,
      );
      expect(JSON.parse(formJson.toString())).toMatchSnapshot(
        `${pokemonName}-form-rb`,
      );
    },
  );
});
