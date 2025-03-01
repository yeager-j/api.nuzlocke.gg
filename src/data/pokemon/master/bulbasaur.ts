import {
  availableStartingRB,
  versionsWithoutHiddenAbilities,
} from "@/data/pokemon/common";
import { Pokemon, PokemonMode, PokemonSpecies } from "@/data/pokemon/types";
import { PokemonVersionGroups } from "@/data/versions";

const BulbasaurSpecies: PokemonSpecies = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroups.SWORD_SHIELD,
    PokemonVersionGroups.SCARLET_VIOLET,
  ],
  nationalDexNumber: 1,
};

const BulbasaurDefaultMode: PokemonMode = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroups.SWORD_SHIELD,
    PokemonVersionGroups.SCARLET_VIOLET,
  ],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  isDefault: true,
  types: {
    default: ["Grass", "Poison"],
    versions: [],
  },
  baseStats: {
    default: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    versions: [
      {
        value: {
          hp: 45,
          attack: 49,
          defense: 49,
          special: 65,
          speed: 45,
        },
        appliesTo: [PokemonVersionGroups.RED_BLUE, PokemonVersionGroups.YELLOW],
      },
    ],
  },
  abilities: {
    default: {
      slot1: "overgrow",
      hidden: "chlorophyll",
    },
    versions: [
      {
        value: { slot1: "overgrow" },
        appliesTo: [...versionsWithoutHiddenAbilities],
      },
    ],
  },
};

const Bulbasaur: Pokemon = {
  name: "bulbasaur",
  displayName: "Bulbasaur",
  availableIn: [
    ...availableStartingRB,
    PokemonVersionGroups.SWORD_SHIELD,
    PokemonVersionGroups.SCARLET_VIOLET,
  ],
  species: BulbasaurSpecies,
  modes: [BulbasaurDefaultMode],
};

export default Bulbasaur;
