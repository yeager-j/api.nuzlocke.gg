import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import {
  availableStartingB2W2,
  availableStartingBW,
  availableStartingC,
  availableStartingDP,
  availableStartingE,
  availableStartingFRLG,
  availableStartingGS,
  availableStartingHGSS,
  availableStartingORAS,
  availableStartingPt,
  availableStartingRB,
  availableStartingRS,
  availableStartingSM,
  availableStartingUSUM,
  availableStartingXY,
  availableStartingY,
  PokemonVersionGroup,
} from "@/data/versions";
import { arraysEqual, isSubset } from "@/lib/pokeapi/utils";

/**
 * Generates a string representation indicating the availability of a Pokémon
 * in specific version groups based on the given input. Used in code generation.
 *
 * @param {PokemonVersionGroup[]} availableIn - An array of version groups where the Pokémon is available.
 * @return {string} A concise string representation describing the availability of the Pokémon,
 *                  including any optimizations for brevity where applicable.
 */
export function generateAvailableInString(
  availableIn: PokemonVersionGroup[],
): string {
  // Define all helper arrays from most specific to most general
  const helperArrays = [
    { name: "availableStartingUSUM", array: availableStartingUSUM },
    { name: "availableStartingSM", array: availableStartingSM },
    { name: "availableStartingORAS", array: availableStartingORAS },
    { name: "availableStartingXY", array: availableStartingXY },
    { name: "availableStartingB2W2", array: availableStartingB2W2 },
    { name: "availableStartingBW", array: availableStartingBW },
    { name: "availableStartingHGSS", array: availableStartingHGSS },
    { name: "availableStartingPt", array: availableStartingPt },
    { name: "availableStartingDP", array: availableStartingDP },
    { name: "availableStartingE", array: availableStartingE },
    { name: "availableStartingFRLG", array: availableStartingFRLG },
    { name: "availableStartingRS", array: availableStartingRS },
    { name: "availableStartingC", array: availableStartingC },
    { name: "availableStartingGS", array: availableStartingGS },
    { name: "availableStartingY", array: availableStartingY },
    { name: "availableStartingRB", array: availableStartingRB },
  ];

  // Case 1: Check for exact matches first
  for (const { name, array } of helperArrays) {
    if (arraysEqual(availableIn, array)) {
      return name;
    }
  }

  // Case 2: Find the most optimal representation
  let bestResult = `[${availableIn.map((v) => versionGroupEnumHelper(v)).join(", ")}]`;
  let bestLength = bestResult.length;

  for (const { name, array } of helperArrays) {
    if (isSubset(array, availableIn)) {
      // Find the additional items not covered by this helper array
      const additional = availableIn.filter((v) => !array.includes(v));

      // Generate the potential result using this helper array
      let potentialResult;
      if (additional.length > 0) {
        potentialResult = `[...${name}, ${additional.map((v) => versionGroupEnumHelper(v)).join(", ")}]`;
      } else {
        potentialResult = name;
      }

      // If this result is shorter than our current best, update it
      if (potentialResult.length < bestLength) {
        bestResult = potentialResult;
        bestLength = potentialResult.length;
      }
    }
  }

  return bestResult;
}

export const versionGroupEnumHelper = enumToString.bind(
  null,
  "PokemonVersionGroup",
  PokemonVersionGroup,
);

export const evolutionTriggerEnumHelper = enumToString.bind(
  null,
  "EvolutionTrigger",
  EvolutionTrigger,
);

export const encounterMethodEnumHelper = enumToString.bind(
  null,
  "EncounterMethod",
  EncounterMethod,
);

/**
 * Converts an enum value to a string representation including the enum name and key. Used in code generation.
 *
 * @param {string} enumName - The name of the enum.
 * @param {T} enumObj - The enum object containing key-value pairs.
 * @param {string | number} value - The value to find within the enum.
 * @return {string} A string in the format of "EnumName.Key" if the value exists in the enum; otherwise, the string representation of the value.
 */
export function enumToString<T extends Record<string, string | number>>(
  enumName: string,
  enumObj: T,
  value: string | number,
): string {
  const key = Object.keys(enumObj).find((k) => enumObj[k as keyof T] === value);
  return key ? `${enumName}.${key}` : String(value);
}
