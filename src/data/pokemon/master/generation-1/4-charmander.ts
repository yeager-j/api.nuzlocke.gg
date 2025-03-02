import { EvolutionTrigger } from "@/data/pokemon/common";
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
};

const definition: PokemonDefinition = {
  species: CharmanderSpecies,
  forms: [Charmander],
};

export default definition;
