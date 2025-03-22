import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import { PokemonLocation } from "@/data/locations/location-list";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import {
  availableStartingRB,
  PokemonGame,
  PokemonVersionGroup,
} from "@/data/versions";

const KakunaSpecies: PokemonSpecies = {
  name: "kakuna",
  displayName: "Kakuna",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 14,
};

const KakunaDefaultMode: PokemonMode = {
  name: "kakuna",
  displayName: "Kakuna",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
  isDefault: true,
  types: {
    default: ["Bug", "Poison"],
    versions: [],
  },
};

const Kakuna: Pokemon = {
  name: "kakuna",
  displayName: "Kakuna",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [KakunaDefaultMode],
  evolution: {
    from: "weedle",
    evolutionBranches: {
      default: [
        {
          to: "beedrill",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 10 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [],
    versions: [
      {
        appliesTo: [PokemonVersionGroup.RED_BLUE],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_24,
            exclusiveTo: PokemonGame.RED,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_VIRIDIAN_FOREST,
          },
        ],
      },
      {
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_24,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_PATTERN_BUSH,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_VIRIDIAN_FOREST,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: KakunaSpecies,
  forms: [Kakuna],
};

export default definition;
