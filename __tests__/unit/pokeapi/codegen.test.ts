import { describe, expect, test } from "vitest";

import MockBulbasaur from "../../__fixtures__/mock-bulbasaur";
import MockRattata from "../../__fixtures__/mock-rattata";

import { EvolutionTrigger } from "@/data/evolution/common";
import { EvolutionBranch } from "@/data/evolution/types";
import { VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";
import {
  generateDefinition,
  generateEvolutionBranch,
  generateEvolutionBranches,
  generateForm,
  generateMode,
  generatePokemonDefinitionFile,
  generateSpecies,
} from "@/lib/pokeapi/codegen";

describe("generateSpecies", () => {
  test("should generate the correct construct for Bulbasaur", () => {
    const construct = generateSpecies(MockBulbasaur.species);

    expect(construct).toMatchSnapshot();
  });
});

describe("generateMode", () => {
  test("should generate the correct construct for Bulbasaur", () => {
    const construct = generateMode(MockBulbasaur.forms[0].modes[0]);

    expect(construct).toMatchSnapshot();
  });
});

describe("generateForm", () => {
  test("should generate the correct construct for Bulbasaur", () => {
    const construct = generateForm(MockBulbasaur.forms[0]);

    expect(construct).toMatchSnapshot();
  });
});

describe("generateEvolution", () => {
  test("should generate an evolution branch construct", () => {
    const branch: EvolutionBranch = {
      to: "ivysaur",
      trigger: EvolutionTrigger.LEVEL_UP,
      conditions: [{ type: "LEVEL", minLevel: 16 }],
    };

    const construct = generateEvolutionBranch(branch);

    expect(construct).toMatchSnapshot();
  });

  test("should generate a versioned evolution branch construct", () => {
    const versionedBranch: VersionedProperty<EvolutionBranch[]> = {
      default: [
        {
          to: "flareon",
          trigger: EvolutionTrigger.ITEM_USE,
          conditions: [{ type: "ITEM_USE", item: "fire-stone" }],
        },
        {
          to: "jolteon",
          trigger: EvolutionTrigger.ITEM_USE,
          conditions: [{ type: "ITEM_USE", item: "thunder-stone" }],
        },
      ],
      versions: [
        {
          appliesTo: [
            PokemonVersionGroup.GOLD_SILVER,
            PokemonVersionGroup.CRYSTAL,
          ],
          value: [
            {
              to: "flareon",
              trigger: EvolutionTrigger.ITEM_USE,
              conditions: [{ type: "ITEM_USE", item: "fire-stone" }],
            },
            {
              to: "jolteon",
              trigger: EvolutionTrigger.ITEM_USE,
              conditions: [{ type: "ITEM_USE", item: "thunder-stone" }],
            },
            {
              to: "vaporeon",
              trigger: EvolutionTrigger.ITEM_USE,
              conditions: [{ type: "ITEM_USE", item: "water-stone" }],
            },
          ],
        },
      ],
    };

    const construct = generateEvolutionBranches(versionedBranch);

    expect(construct).toMatchSnapshot();
  });
});

describe("generateDefinition", () => {
  test("should generate a definition construct", () => {
    const construct = generateDefinition(
      MockBulbasaur.species,
      MockBulbasaur.forms,
    );

    expect(construct).toMatchSnapshot();
  });

  test("should generate a definition construct with multiple forms", () => {
    const construct = generateDefinition(
      MockRattata.species,
      MockRattata.forms,
    );

    expect(construct).toMatchSnapshot();
  });
});

describe("generatePokemonDefinitionFile", () => {
  test("should generate a file for Bulbasaur", () => {
    const construct = generatePokemonDefinitionFile(MockBulbasaur);

    expect(construct).toMatchSnapshot();
  });
});
