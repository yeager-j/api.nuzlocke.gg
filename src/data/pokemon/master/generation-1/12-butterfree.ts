import { EncounterMethod } from "@/data/locations/common";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { availableStartingRB, PokemonVersionGroup } from "@/data/versions";

const ButterfreeSpecies: PokemonSpecies = {
  name: "butterfree",
  displayName: "Butterfree",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  nationalDexNumber: 12,
};

const ButterfreeDefaultMode: PokemonMode = {
  name: "butterfree",
  displayName: "Butterfree",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
  isDefault: true,
  types: {
    default: ["Bug", "Flying"],
    versions: [],
  },
};

const Butterfree: Pokemon = {
  name: "butterfree",
  displayName: "Butterfree",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  isDefault: true,
  modes: [ButterfreeDefaultMode],
  evolution: {
    from: "metapod",
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
  species: ButterfreeSpecies,
  forms: [Butterfree],
};

export default definition;
