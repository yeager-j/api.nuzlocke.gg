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

const VenusaurSpecies: PokemonSpecies = {
  name: "venusaur",
  displayName: "Venusaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  nationalDexNumber: 3,
};

const VenusaurDefaultMode: PokemonMode = {
  name: "venusaur",
  displayName: "Venusaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  isDefault: true,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
};

const VenusaurMegaMode: PokemonMode = {
  name: "venusaur-mega",
  displayName: "Mega Venusaur",
  availableIn: [...gamesWithMegaEvolution],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10033.png",
  isDefault: false,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
};

const VenusaurGMaxMode: PokemonMode = {
  name: "venusaur-gmax",
  displayName: "Gigantamax Venusaur",
  availableIn: [...gamesWithGigantamax],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10195.png",
  isDefault: false,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
};

const Venusaur: Pokemon = {
  name: "venusaur",
  displayName: "Venusaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroup.SWORD_SHIELD,
    PokemonVersionGroup.SCARLET_VIOLET,
  ],
  isDefault: true,
  modes: [VenusaurDefaultMode, VenusaurMegaMode, VenusaurGMaxMode],
  evolution: {
    from: "ivysaur",
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
  species: VenusaurSpecies,
  forms: [Venusaur],
};

export default definition;
