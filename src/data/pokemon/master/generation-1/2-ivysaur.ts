import { EvolutionTrigger } from "@/data/pokemon/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const IvysaurSpecies: PokemonSpecies = {
  name: "ivysaur",
  displayName: "Ivysaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 2,
};

const IvysaurDefaultMode: PokemonMode = {
  name: "ivysaur",
  displayName: "Ivysaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  isDefault: true,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
};

const Ivysaur: Pokemon = {
  name: "ivysaur",
  displayName: "Ivysaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  modes: [IvysaurDefaultMode],
  evolution: {
    from: "bulbasaur",
    evolutionBranches: {
      default: [
        {
          to: "venusaur",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 32 }],
        },
      ],
      versions: [],
    },
  },
};

const definition: PokemonDefinition = {
  species: IvysaurSpecies,
  forms: [Ivysaur],
};

export default definition;
