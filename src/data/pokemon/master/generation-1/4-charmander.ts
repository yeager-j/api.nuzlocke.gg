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

const CharmanderSpecies: PokemonSpecies = {
  name: "charmander",
  displayName: "Charmander",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 4,
};

const CharmanderDefaultMode: PokemonMode = {
  name: "charmander",
  displayName: "Charmander",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  isDefault: true,
  types: {
    default: ["Fire"],
    versions: [],
  },
};

const Charmander: Pokemon = {
  name: "charmander",
  displayName: "Charmander",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [CharmanderDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "charmeleon",
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
            location: KantoLocation.PALLET_TOWN,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: CharmanderSpecies,
  forms: [Charmander],
};

export default definition;
