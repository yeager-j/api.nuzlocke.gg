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

const BulbasaurSpecies: PokemonSpecies = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 1,
};

const BulbasaurDefaultMode: PokemonMode = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  isDefault: true,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
};

const Bulbasaur: Pokemon = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [BulbasaurDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "ivysaur",
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
  species: BulbasaurSpecies,
  forms: [Bulbasaur],
};

export default definition;
