import path from "path";
import { vol } from "memfs";
import { beforeEach, describe, expect, test, vi } from "vitest";

import mockCaterpie from "../__fixtures__/mock-caterpie";

import { buildLocationApi } from "@/lib/pokemon/build-location-api";
import { LOCATION_OUTPUT_PATH, POKEMON_DATA_PATH } from "@/lib/pokemon/common";
import { loadPokemon } from "@/lib/pokemon/utils";

vi.mock("fs/promises");
vi.mock("@/lib/pokemon/utils", async () => {
  const actual = await vi.importActual("@/lib/pokemon/utils");
  return {
    ...actual,
    loadPokemon: vi.fn(),
  };
});

describe("buildLocationApi integration", () => {
  beforeEach(async () => {
    vol.reset();

    vol.mkdirSync(path.join(POKEMON_DATA_PATH, "generation-1"), {
      recursive: true,
    });

    vol.writeFileSync(
      path.join(POKEMON_DATA_PATH, "generation-1", "10-caterpie.ts"),
      "",
    );

    vi.mocked(loadPokemon).mockImplementation(async (_, pokemonFile) => {
      if (pokemonFile === "10-caterpie.ts") return mockCaterpie;
      throw new Error(`Unexpected pokemon file: ${pokemonFile}`);
    });
  });

  test("correct file structure should exist", async () => {
    await buildLocationApi();

    expect(vol.existsSync(path.join(LOCATION_OUTPUT_PATH, "red"))).toBe(true);
    expect(vol.existsSync(path.join(LOCATION_OUTPUT_PATH, "blue"))).toBe(true);
    expect(vol.existsSync(path.join(LOCATION_OUTPUT_PATH, "firered"))).toBe(
      true,
    );
    expect(vol.existsSync(path.join(LOCATION_OUTPUT_PATH, "leafgreen"))).toBe(
      true,
    );
  });

  test("should build the location files", async () => {
    await buildLocationApi();

    const blueRoute2Json = vol.readFileSync(
      path.join(LOCATION_OUTPUT_PATH, "blue", "route-2.json"),
      "utf8",
    );
    const redRoute2Json = vol.readFileSync(
      path.join(LOCATION_OUTPUT_PATH, "red", "route-2.json"),
      "utf8",
    );

    const fireredViridianForestJson = vol.readFileSync(
      path.join(LOCATION_OUTPUT_PATH, "firered", "viridian-forest.json"),
      "utf8",
    );
    const leafgreenViridianForestJson = vol.readFileSync(
      path.join(LOCATION_OUTPUT_PATH, "leafgreen", "viridian-forest.json"),
      "utf8",
    );

    expect(JSON.parse(blueRoute2Json.toString())).toMatchSnapshot();
    expect(JSON.parse(redRoute2Json.toString())).toMatchSnapshot();
    expect(JSON.parse(fireredViridianForestJson.toString())).toMatchSnapshot();
    expect(
      JSON.parse(leafgreenViridianForestJson.toString()),
    ).toMatchSnapshot();
  });
});
