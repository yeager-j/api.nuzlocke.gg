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

const SquirtleSpecies: PokemonSpecies = {
  name: "squirtle",
  displayName: "Squirtle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 7,
};

const SquirtleDefaultMode: PokemonMode = {
  name: "squirtle",
  displayName: "Squirtle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  isDefault: true,
  types: {
    default: ["Water"],
    versions: [],
  },
};

const Squirtle: Pokemon = {
  name: "squirtle",
  displayName: "Squirtle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [SquirtleDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "wartortle",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 16 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [],
    versions: [
      {
        appliesTo: [
          PokemonVersionGroup.RED_BLUE,
          PokemonVersionGroup.FIRERED_LEAFGREEN,
        ],
        value: [
          {
            method: EncounterMethod.GIFT,
            location: PokemonLocation.KANTO_PALLET_TOWN,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: SquirtleSpecies,
  forms: [Squirtle],
};

export default definition;
