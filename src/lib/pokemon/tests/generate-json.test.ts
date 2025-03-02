import path from "path";
import { vol } from "memfs";
import { beforeAll, describe, test, vi } from "vitest";

import CharizardDefinition from "@/data/pokemon/master/generation-1/6-charizard";
import { PokemonVersionGroup, PokemonVersionGroupData } from "@/data/versions";
import { POKEMON_OUTPUT_PATH } from "@/lib/pokemon/common";
import { processPokemonForVersion } from "@/lib/pokemon/generate-pokemon-json";

vi.mock("node:fs");
vi.mock("node:fs/promises");

describe("Generate JSON", () => {
  beforeAll(() => {
    // reset the state of in-memory fs
    vol.reset();
  });

  test.concurrent.for(Object.values(PokemonVersionGroup))(
    "should generate Charizard for %s",
    async (versionGroup, { expect }) => {
      await processPokemonForVersion(CharizardDefinition, versionGroup);

      const charizardFormJSON = vol.readFileSync(
        path.join(
          POKEMON_OUTPUT_PATH,
          PokemonVersionGroupData[versionGroup].id,
          "forms",
          `${CharizardDefinition.forms[0].name}.json`,
        ),
        "utf8",
      );

      const charizardSpeciesJSON = vol.readFileSync(
        path.join(
          POKEMON_OUTPUT_PATH,
          PokemonVersionGroupData[versionGroup].id,
          "species",
          `${CharizardDefinition.species.name}.json`,
        ),
        "utf8",
      );

      expect(charizardFormJSON).toMatchSnapshot();
      expect(charizardSpeciesJSON).toMatchSnapshot();
    },
  );
});
