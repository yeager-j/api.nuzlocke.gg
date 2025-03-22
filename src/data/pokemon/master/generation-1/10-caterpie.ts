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

const CaterpieSpecies: PokemonSpecies = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  nationalDexNumber: 10,
};

const CaterpieDefaultMode: PokemonMode = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  isDefault: true,
  types: {
    default: ["Bug"],
    versions: [],
  },
};

const Caterpie: Pokemon = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  isDefault: true,
  modes: [CaterpieDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "metapod",
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
            location: PokemonLocation.KANTO_ROUTE_2,
            exclusiveTo: PokemonGame.BLUE,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_24,
            exclusiveTo: PokemonGame.BLUE,
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
            location: PokemonLocation.KANTO_ROUTE_2,
          },
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
  species: CaterpieSpecies,
  forms: [Caterpie],
};

export default definition;
