import { EncounterMethod } from "@/data/locations/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import {
  availableStartingRB,
  gamesWithGigantamax,
  gamesWithMegaEvolution,
  PokemonVersionGroup,
} from "@/data/versions";

const CharizardSpecies: PokemonSpecies = {
  name: "charizard",
  displayName: "Charizard",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 6,
};

const CharizardDefaultMode: PokemonMode = {
  name: "charizard",
  displayName: "Charizard",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  isDefault: true,
  types: {
    default: ["Fire", "Flying"],
    versions: [],
  },
};

const CharizardMegaXMode: PokemonMode = {
  name: "charizard-mega-x",
  displayName: "Mega Charizard X",
  availableIn: [...gamesWithMegaEvolution],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10034.png",
  isDefault: false,
  types: {
    default: ["Fire", "Dragon"],
    versions: [],
  },
};

const CharizardMegaYMode: PokemonMode = {
  name: "charizard-mega-y",
  displayName: "Mega Charizard Y",
  availableIn: [...gamesWithMegaEvolution],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10035.png",
  isDefault: false,
  types: {
    default: ["Fire", "Flying"],
    versions: [],
  },
};

const CharizardGMaxMode: PokemonMode = {
  name: "charizard-gmax",
  displayName: "Gigantamax Charizard",
  availableIn: [...gamesWithGigantamax],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10196.png",
  isDefault: false,
  types: {
    default: ["Fire", "Flying"],
    versions: [],
  },
};

const Charizard: Pokemon = {
  name: "charizard",
  displayName: "Charizard",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  modes: [
    CharizardDefaultMode,
    CharizardMegaXMode,
    CharizardMegaYMode,
    CharizardGMaxMode,
  ],
  evolution: {
    from: "charmeleon",
    evolutionBranches: {
      default: [],
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
  species: CharizardSpecies,
  forms: [Charizard],
};

export default definition;
