import { EncounterMethod } from "@/data/locations/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB } from "@/data/versions";

const PidgeotSpecies: PokemonSpecies = {
  name: "pidgeot",
  displayName: "Pidgeot",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 16,
};

const PidgeotDefaultMode: PokemonMode = {
  name: "pidgeot",
  displayName: "Pidgeot",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
  isDefault: true,
  types: {
    default: ["Normal", "Flying"],
    versions: [],
  },
};

const Pidgeot: Pokemon = {
  name: "pidgeot",
  displayName: "Pidgeot",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [PidgeotDefaultMode],
  evolution: {
    from: "pidgeotto",
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
  species: PidgeotSpecies,
  forms: [Pidgeot],
};

export default definition;
