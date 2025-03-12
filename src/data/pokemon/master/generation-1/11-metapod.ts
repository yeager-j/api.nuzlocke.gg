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

const MetapodSpecies: PokemonSpecies = {
  name: "metapod",
  displayName: "Metapod",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  nationalDexNumber: 11,
};

const MetapodDefaultMode: PokemonMode = {
  name: "metapod",
  displayName: "Metapod",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
  isDefault: true,
  types: {
    default: ["Bug"],
    versions: [],
  },
};

const Metapod: Pokemon = {
  name: "metapod",
  displayName: "Metapod",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  isDefault: true,
  modes: [MetapodDefaultMode],
  evolution: {
    from: "caterpie",
    evolutionBranches: {
      default: [
        {
          to: "butterfree",
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
            location: KantoLocation.ROUTE_24,
            exclusiveTo: PokemonGame.BLUE,
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
  species: MetapodSpecies,
  forms: [Metapod],
};

export default definition;
