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
  PokemonVersionGroup,
} from "@/data/versions";

const Tackle: Move = {
  name: Moves.TACKLE,
  displayName: "Tackle",
  availableIn: [...availableStartingRB],
  type: {
    default: "Normal",
    versions: [],
  },
  description: {
    default:
      "A physical attack in which the user charges and slams into the target with its whole body.",
    versions: [
      {
        value:
          "A physical attack in which the user charges and slams into the target with its whole body.",
        appliesTo: [
          PokemonVersionGroup.DIAMOND_PEARL,
          PokemonVersionGroup.PLATINUM,
          PokemonVersionGroup.HEARTGOLD_SOULSILVER,
          PokemonVersionGroup.BLACK_WHITE,
          PokemonVersionGroup.BLACK_2_WHITE_2,
          PokemonVersionGroup.XY,
          PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
          PokemonVersionGroup.SUN_MOON,
          PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON,
          PokemonVersionGroup.SWORD_SHIELD,
          PokemonVersionGroup.SCARLET_VIOLET,
        ],
      },
      {
        value:
          "A physical attack in which the user charges, full body, into the foe.",
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
      },
      {
        value: "Charges the foe with a full-body tackle.",
        appliesTo: [
          PokemonVersionGroup.RUBY_SAPPHIRE,
          PokemonVersionGroup.EMERALD,
        ],
      },
      {
        value: "A full-body charge attack.",
        appliesTo: [
          PokemonVersionGroup.GOLD_SILVER,
          PokemonVersionGroup.CRYSTAL,
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
