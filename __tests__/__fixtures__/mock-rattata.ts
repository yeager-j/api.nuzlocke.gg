import { EvolutionTrigger } from "@/data/evolution/common";
import { EncounterMethod } from "@/data/locations/common";
import { KantoLocation } from "@/data/locations/regions/kanto/locations";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import {
  availableStartingRB,
  availableStartingSM,
  PokemonVersionGroup,
} from "@/data/versions";

const RattataSpecies: PokemonSpecies = {
  name: "rattata",
  displayName: "Rattata",
  availableIn: [...availableStartingRB],
  nationalDexNumber: 19,
};

const RattataDefaultMode: PokemonMode = {
  name: "rattata",
  displayName: "Rattata",
  availableIn: [...availableStartingRB],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
  isDefault: true,
  types: {
    default: ["Normal"],
    versions: [],
  },
};

const RattataAlolaDefaultMode: PokemonMode = {
  name: "rattata-alola",
  displayName: "Rattata",
  availableIn: [...availableStartingSM],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10091.png",
  isDefault: true,
  types: {
    default: ["Normal", "Dark"],
    versions: [],
  },
};

const Rattata: Pokemon = {
  name: "rattata",
  displayName: "Rattata",
  availableIn: [...availableStartingRB],
  isDefault: true,
  modes: [RattataDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "raticate",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 20 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [],
    versions: [],
  },
};

const RattataAlola: Pokemon = {
  name: "rattata-alola",
  displayName: "Rattata",
  availableIn: [...availableStartingSM],
  isDefault: false,
  modes: [RattataAlolaDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "raticate-alola",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 20 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [],
    versions: [],
  },
};

const definition: PokemonDefinition = {
  species: RattataSpecies,
  forms: [Rattata, RattataAlola],
};

export default definition;
