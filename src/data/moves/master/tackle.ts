import { Moves } from "@/data/moves/move-list";
import { Move, MoveCategory } from "@/data/moves/types";
import {
  availableStartingRB,
  gen1Games,
  gen2Games,
  gen3Games,
  gen4Games,
  gen5Games,
  gen6Games,
} from "@/data/pokemon/common";
import { PokemonVersionGroups } from "@/data/versions";

const Tackle: Move = {
  name: Moves.TACKLE,
  displayName: "Tackle",
  availableIn: [...availableStartingRB],
  description: {
    default:
      "A physical attack in which the user charges and slams into the target with its whole body.",
    versions: [
      {
        value:
          "A physical attack in which the user charges and slams into the target with its whole body.",
        appliesTo: [
          PokemonVersionGroups.DIAMOND_PEARL,
          PokemonVersionGroups.PLATINUM,
          PokemonVersionGroups.HEARTGOLD_SOULSILVER,
          PokemonVersionGroups.BLACK_WHITE,
          PokemonVersionGroups.BLACK_2_WHITE_2,
          PokemonVersionGroups.XY,
          PokemonVersionGroups.OMEGA_RUBY_ALPHA_SAPPHIRE,
          PokemonVersionGroups.SUN_MOON,
          PokemonVersionGroups.ULTRA_SUN_ULTRA_MOON,
          PokemonVersionGroups.SWORD_SHIELD,
          PokemonVersionGroups.SCARLET_VIOLET,
        ],
      },
      {
        value:
          "A physical attack in which the user charges, full body, into the foe.",
        appliesTo: [PokemonVersionGroups.FIRERED_LEAFGREEN],
      },
      {
        value: "Charges the foe with a full-body tackle.",
        appliesTo: [
          PokemonVersionGroups.RUBY_SAPPHIRE,
          PokemonVersionGroups.EMERALD,
        ],
      },
      {
        value: "A full-body charge attack.",
        appliesTo: [
          PokemonVersionGroups.GOLD_SILVER,
          PokemonVersionGroups.CRYSTAL,
        ],
      },
    ],
  },
  category: {
    default: MoveCategory.PHYSICAL,
    versions: [],
  },
  power: {
    default: 40,
    versions: [
      {
        value: 35,
        appliesTo: [...gen1Games, ...gen2Games, ...gen3Games, ...gen4Games],
      },
      {
        value: 50,
        appliesTo: [...gen5Games, ...gen6Games],
      },
    ],
  },
  accuracy: {
    default: 100,
    versions: [
      {
        value: 95,
        appliesTo: [...gen1Games, ...gen2Games, ...gen3Games, ...gen4Games],
      },
    ],
  },
  pp: {
    default: 35,
    versions: [],
  },
};

export default Tackle;
