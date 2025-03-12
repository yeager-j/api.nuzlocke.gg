import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import { KantoLocation } from "@/data/locations/regions/kanto/locations";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const PidgeottoSpecies: PokemonSpecies = {
  name: "pidgeotto",
  displayName: "Pidgeotto",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 16,
};

const PidgeottoDefaultMode: PokemonMode = {
  name: "pidgeotto",
  displayName: "Pidgeotto",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
  isDefault: true,
  types: {
    default: ["Normal", "Flying"],
    versions: [],
  },
};

const Pidgeotto: Pokemon = {
  name: "pidgeotto",
  displayName: "Pidgeotto",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [PidgeottoDefaultMode],
  evolution: {
    from: "pidgey",
    evolutionBranches: {
      default: [
        {
          to: "pidgeot",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 36 }],
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
            location: KantoLocation.ROUTE_14,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_15,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_21,
          },
        ],
      },
      {
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_13,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_14,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_15,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.BERRY_FOREST,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.BOND_BRIDGE,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.FIVE_ISLE_MEADOW,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: PidgeottoSpecies,
  forms: [Pidgeotto],
};

export default definition;
