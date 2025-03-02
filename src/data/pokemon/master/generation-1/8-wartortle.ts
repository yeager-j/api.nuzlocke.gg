import { EvolutionTrigger } from "@/data/pokemon/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const WartortleSpecies: PokemonSpecies = {
  name: "wartortle",
  displayName: "Wartortle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 8,
};

const WartortleDefaultMode: PokemonMode = {
  name: "wartortle",
  displayName: "Wartortle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  isDefault: true,
  types: {
    default: ["Water"],
    versions: [],
  },
};

const Wartortle: Pokemon = {
  name: "wartortle",
  displayName: "Wartortle",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  modes: [WartortleDefaultMode],
  evolution: {
    from: "squirtle",
    evolutionBranches: {
      default: [
        {
          to: "blastoise",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 36 }],
        },
      ],
      versions: [],
    },
  },
};

const definition: PokemonDefinition = {
  species: WartortleSpecies,
  forms: [Wartortle],
};

export default definition;
