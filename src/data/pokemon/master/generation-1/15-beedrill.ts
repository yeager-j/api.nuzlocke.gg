import { EncounterMethod } from "@/data/locations/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB } from "@/data/versions";

const BeedrillSpecies: PokemonSpecies = {
  name: "beedrill",
  displayName: "Beedrill",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 15,
};

const BeedrillDefaultMode: PokemonMode = {
  name: "beedrill",
  displayName: "Beedrill",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
  isDefault: true,
  types: {
    default: ["Bug", "Poison"],
    versions: [],
  },
};

const Beedrill: Pokemon = {
  name: "beedrill",
  displayName: "Beedrill",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [BeedrillDefaultMode],
  evolution: {
    from: "kakuna",
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
  species: BeedrillSpecies,
  forms: [Beedrill],
};

export default definition;
