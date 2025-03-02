import { describe, expect, it } from "vitest";

import { getVersionedData } from "../utils";

import { VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";

describe("getVersionedData", () => {
  it("returns the version-specific value when it exists", () => {
    const versionedData: VersionedProperty<string> = {
      default: "Default Value",
      versions: [
        {
          appliesTo: [PokemonVersionGroup.RED_BLUE, PokemonVersionGroup.YELLOW],
          value: "Gen 1 Value",
        },
        {
          appliesTo: [
            PokemonVersionGroup.GOLD_SILVER,
            PokemonVersionGroup.CRYSTAL,
          ],
          value: "Gen 2 Value",
        },
      ],
    };

    expect(getVersionedData(versionedData, PokemonVersionGroup.RED_BLUE)).toBe(
      "Gen 1 Value",
    );
    expect(getVersionedData(versionedData, PokemonVersionGroup.YELLOW)).toBe(
      "Gen 1 Value",
    );
    expect(
      getVersionedData(versionedData, PokemonVersionGroup.GOLD_SILVER),
    ).toBe("Gen 2 Value");
    expect(getVersionedData(versionedData, PokemonVersionGroup.CRYSTAL)).toBe(
      "Gen 2 Value",
    );
  });

  it("returns the default value when no version-specific data exists", () => {
    const versionedData: VersionedProperty<string> = {
      default: "Default Value",
      versions: [
        {
          appliesTo: [PokemonVersionGroup.RED_BLUE, PokemonVersionGroup.YELLOW],
          value: "Gen 1 Value",
        },
      ],
    };

    expect(
      getVersionedData(versionedData, PokemonVersionGroup.SWORD_SHIELD),
    ).toBe("Default Value");
  });

  it("works with array data types", () => {
    const versionedData: VersionedProperty<string[]> = {
      default: ["Default1", "Default2"],
      versions: [
        {
          appliesTo: [PokemonVersionGroup.RED_BLUE],
          value: ["Gen1Item1", "Gen1Item2"],
        },
        {
          appliesTo: [PokemonVersionGroup.SWORD_SHIELD],
          value: ["Gen8Item1", "Gen8Item2", "Gen8Item3"],
        },
      ],
    };

    expect(
      getVersionedData(versionedData, PokemonVersionGroup.RED_BLUE),
    ).toEqual(["Gen1Item1", "Gen1Item2"]);
    expect(
      getVersionedData(versionedData, PokemonVersionGroup.SWORD_SHIELD),
    ).toEqual(["Gen8Item1", "Gen8Item2", "Gen8Item3"]);
    expect(
      getVersionedData(versionedData, PokemonVersionGroup.DIAMOND_PEARL),
    ).toEqual(["Default1", "Default2"]);
  });

  it("works with object data types", () => {
    const versionedData: VersionedProperty<{ name: string; value: number }> = {
      default: { name: "DefaultObj", value: 0 },
      versions: [
        {
          appliesTo: [PokemonVersionGroup.XY],
          value: { name: "Gen6Obj", value: 6 },
        },
      ],
    };

    expect(getVersionedData(versionedData, PokemonVersionGroup.XY)).toEqual({
      name: "Gen6Obj",
      value: 6,
    });
    expect(
      getVersionedData(versionedData, PokemonVersionGroup.RUBY_SAPPHIRE),
    ).toEqual({ name: "DefaultObj", value: 0 });
  });

  it("returns default value when versions array is empty", () => {
    const versionedData: VersionedProperty<string> = {
      default: "Default Value",
      versions: [],
    };

    expect(
      getVersionedData(versionedData, PokemonVersionGroup.SCARLET_VIOLET),
    ).toBe("Default Value");
  });

  it("returns the first matching version when multiple could apply", () => {
    const versionedData: VersionedProperty<string> = {
      default: "Default Value",
      versions: [
        {
          appliesTo: [PokemonVersionGroup.RED_BLUE],
          value: "First Match",
        },
        {
          appliesTo: [PokemonVersionGroup.RED_BLUE, PokemonVersionGroup.YELLOW],
          value: "Second Match",
        },
      ],
    };

    expect(getVersionedData(versionedData, PokemonVersionGroup.RED_BLUE)).toBe(
      "First Match",
    );
  });
});
