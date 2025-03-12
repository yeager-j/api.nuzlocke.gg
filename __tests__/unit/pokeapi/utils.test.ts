import { describe, expect, test } from "vitest";

import {
  availableStartingDP,
  availableStartingRB,
  availableStartingUSUM,
  availableStartingXY,
  PokemonVersionGroup,
} from "@/data/versions";
import { enumToString, generateAvailableInString } from "@/lib/pokeapi/helpers";

describe("generateAvailableInString", () => {
  // Test exact matches with helper arrays
  test("should return the helper array name when there is an exact match", () => {
    expect(generateAvailableInString(availableStartingRB)).toBe(
      "availableStartingRB",
    );
    expect(generateAvailableInString(availableStartingXY)).toBe(
      "availableStartingXY",
    );
    expect(generateAvailableInString(availableStartingUSUM)).toBe(
      "availableStartingUSUM",
    );
  });

  // Test helper array + additional version groups
  test("should use spread syntax with additional version groups", () => {
    // Butterfree example: availableStartingRB + SWORD_SHIELD
    const butterfreeVersions = [
      ...availableStartingRB,
      PokemonVersionGroup.SWORD_SHIELD,
    ];
    expect(generateAvailableInString(butterfreeVersions)).toBe(
      "[...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD]",
    );

    // Test with multiple additional version groups
    const multipleAdditions = [
      ...availableStartingDP,
      PokemonVersionGroup.SWORD_SHIELD,
      PokemonVersionGroup.SCARLET_VIOLET,
    ];
    expect(generateAvailableInString(multipleAdditions)).toBe(
      "[...availableStartingDP, PokemonVersionGroup.SWORD_SHIELD, PokemonVersionGroup.SCARLET_VIOLET]",
    );
  });

  // Test with a subset of a helper array
  test("should find the most specific helper array that is a superset", () => {
    // Only available in XY and ORAS (subset of availableStartingORAS)
    const xyAndOras = [
      PokemonVersionGroup.XY,
      PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
    ];

    // This should find a helper array that's a superset and list the specific versions
    expect(generateAvailableInString(xyAndOras)).toBe(
      "[PokemonVersionGroup.XY, PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]",
    );
  });

  // Test with no matching pattern
  test("should list all version groups when no pattern matches", () => {
    // A completely custom set of version groups
    const customVersions = [
      PokemonVersionGroup.DIAMOND_PEARL,
      PokemonVersionGroup.SWORD_SHIELD,
      PokemonVersionGroup.RED_BLUE,
    ];

    expect(generateAvailableInString(customVersions)).toBe(
      "[PokemonVersionGroup.DIAMOND_PEARL, PokemonVersionGroup.SWORD_SHIELD, PokemonVersionGroup.RED_BLUE]",
    );
  });

  // Test with incomplete helper array patterns
  test("should handle pokemon available in non-consecutive version groups", () => {
    // Available in RB and then skipped generations until DP
    const discontinuousVersions = [
      PokemonVersionGroup.RED_BLUE,
      PokemonVersionGroup.DIAMOND_PEARL,
      PokemonVersionGroup.PLATINUM,
    ];

    expect(generateAvailableInString(discontinuousVersions)).toBe(
      "[PokemonVersionGroup.RED_BLUE, PokemonVersionGroup.DIAMOND_PEARL, PokemonVersionGroup.PLATINUM]",
    );
  });

  // Test with empty array
  test("should handle empty version groups array", () => {
    expect(generateAvailableInString([])).toBe("[]");
  });
});

describe("enumFromValue", () => {
  test("should return a stringified enum representation", () => {
    const str = enumToString(
      "PokemonVersionGroup",
      PokemonVersionGroup,
      "FIRERED_LEAFGREEN",
    );

    expect(str).toBe("PokemonVersionGroup.FIRERED_LEAFGREEN");
  });
});
