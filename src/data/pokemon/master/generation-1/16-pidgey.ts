import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import { PokemonLocation } from "@/data/locations/location-list";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const PidgeySpecies: PokemonSpecies = {
  name: "pidgey",
  displayName: "Pidgey",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 16,
};

const PidgeyDefaultMode: PokemonMode = {
  name: "pidgey",
  displayName: "Pidgey",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
  isDefault: true,
  types: {
    default: ["Normal", "Flying"],
    versions: [],
  },
};

const Pidgey: Pokemon = {
  name: "pidgey",
  displayName: "Pidgey",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [PidgeyDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "pidgeotto",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 18 }],
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
            location: PokemonLocation.KANTO_ROUTE_1,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_2,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_3,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_5,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_6,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_7,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_8,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_12,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_13,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_14,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_15,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_21,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_24,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_25,
          },
        ],
      },
      {
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_1,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_2,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_3,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_5,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_6,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_7,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_8,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_12,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_13,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_14,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_ROUTE_15,
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
            location: PokemonLocation.KANTO_BERRY_FOREST,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_BOND_BRIDGE,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: PokemonLocation.KANTO_FIVE_ISLE_MEADOW,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: PidgeySpecies,
  forms: [Pidgey],
};

export default definition;
