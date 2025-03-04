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

const BlastoiseSpecies: PokemonSpecies = {
  name: "blastoise",
  displayName: "Blastoise",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 9,
};

const BlastoiseDefaultMode: PokemonMode = {
  name: "blastoise",
  displayName: "Blastoise",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  isDefault: true,
  types: {
    default: ["Water"],
    versions: [],
  },
};

const BlastoiseMegaMode: PokemonMode = {
  name: "blastoise-mega",
  displayName: "Mega Blastoise",
  availableIn: [...gamesWithMegaEvolution],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10036.png",
  isDefault: false,
  types: {
    default: ["Water"],
    versions: [],
  },
};

const BlastoiseGMaxMode: PokemonMode = {
  name: "blastoise-gmax",
  displayName: "Gigantamax Blastoise",
  availableIn: [...gamesWithGigantamax],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10197.png",
  isDefault: false,
  types: {
    default: ["Water"],
    versions: [],
  },
};

const Blastoise: Pokemon = {
  name: "blastoise",
  displayName: "Blastoise",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [BlastoiseDefaultMode, BlastoiseMegaMode, BlastoiseGMaxMode],
  evolution: {
    from: "wartortle",
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
  species: BlastoiseSpecies,
  forms: [Blastoise],
};

export default definition;
