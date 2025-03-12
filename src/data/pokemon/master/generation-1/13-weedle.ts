import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import { KantoLocation } from "@/data/locations/regions/kanto/locations";
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

const WeedleSpecies: PokemonSpecies = {
  name: "weedle",
  displayName: "Weedle",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 13,
};

const WeedleDefaultMode: PokemonMode = {
  name: "weedle",
  displayName: "Weedle",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
  isDefault: true,
  types: {
    default: ["Bug", "Poison"],
    versions: [],
  },
};

const Weedle: Pokemon = {
  name: "weedle",
  displayName: "Weedle",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [WeedleDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "kakuna",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 7 }],
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
            location: KantoLocation.ROUTE_2,
            exclusiveTo: PokemonGame.RED,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_24,
            exclusiveTo: PokemonGame.RED,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.VIRIDIAN_FOREST,
          },
        ],
      },
      {
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_2,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_24,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.PATTERN_BUSH,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.VIRIDIAN_FOREST,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: WeedleSpecies,
  forms: [Weedle],
};

export default definition;
