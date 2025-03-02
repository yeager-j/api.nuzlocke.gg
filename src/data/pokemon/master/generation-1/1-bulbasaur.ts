import { EvolutionTrigger } from "@/data/pokemon/common";
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
};

const definition: PokemonDefinition = {
  species: BulbasaurSpecies,
  forms: [Bulbasaur],
};

export default definition;
