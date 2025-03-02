import { EvolutionTrigger } from "@/data/pokemon/common";
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
};

const definition: PokemonDefinition = {
  species: SquirtleSpecies,
  forms: [Squirtle],
};

export default definition;
