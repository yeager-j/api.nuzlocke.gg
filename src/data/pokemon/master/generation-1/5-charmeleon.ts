import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const CharmeleonSpecies: PokemonSpecies = {
  name: "charmeleon",
  displayName: "Charmeleon",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 5,
};

const CharmeleonDefaultMode: PokemonMode = {
  name: "charmeleon",
  displayName: "Charmeleon",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  isDefault: true,
  types: {
    default: ["Fire"],
    versions: [],
  },
};

const Charmeleon: Pokemon = {
  name: "charmeleon",
  displayName: "Charmeleon",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [CharmeleonDefaultMode],
  evolution: {
    from: "charmander",
    evolutionBranches: {
      default: [
        {
          to: "charizard",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 36 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [
      {
        method: EncounterMethod.EVOLVE,
      },
    ],
    versions: [],
  },
};

const definition: PokemonDefinition = {
  species: CharmeleonSpecies,
  forms: [Charmeleon],
};

export default definition;
