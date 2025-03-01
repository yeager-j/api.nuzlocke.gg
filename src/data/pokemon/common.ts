import { PokemonVersionGroups } from "@/data/versions";

export const availableStartingUSUM: PokemonVersionGroups[] = [
  PokemonVersionGroups.ULTRA_SUN_ULTRA_MOON,
];

export const availableStartingSM: PokemonVersionGroups[] = [
  ...availableStartingUSUM,
  PokemonVersionGroups.SUN_MOON,
];

export const availableStartingORAS: PokemonVersionGroups[] = [
  ...availableStartingSM,
  PokemonVersionGroups.OMEGA_RUBY_ALPHA_SAPPHIRE,
];

export const availableStartingXY: PokemonVersionGroups[] = [
  ...availableStartingORAS,
  PokemonVersionGroups.XY,
];

export const availableStartingB2W2: PokemonVersionGroups[] = [
  ...availableStartingXY,
  PokemonVersionGroups.BLACK_2_WHITE_2,
];

export const availableStartingBW: PokemonVersionGroups[] = [
  ...availableStartingB2W2,
  PokemonVersionGroups.BLACK_WHITE,
];

export const availableStartingHGSS: PokemonVersionGroups[] = [
  ...availableStartingBW,
  PokemonVersionGroups.HEARTGOLD_SOULSILVER,
];

export const availableStartingPt: PokemonVersionGroups[] = [
  ...availableStartingHGSS,
  PokemonVersionGroups.PLATINUM,
];

export const availableStartingDP: PokemonVersionGroups[] = [
  ...availableStartingPt,
  PokemonVersionGroups.DIAMOND_PEARL,
];

export const availableStartingE: PokemonVersionGroups[] = [
  ...availableStartingDP,
  PokemonVersionGroups.EMERALD,
];

export const availableStartingFRLG: PokemonVersionGroups[] = [
  ...availableStartingE,
  PokemonVersionGroups.FIRERED_LEAFGREEN,
];

export const availableStartingRS: PokemonVersionGroups[] = [
  ...availableStartingFRLG,
  PokemonVersionGroups.RUBY_SAPPHIRE,
];

export const availableStartingC: PokemonVersionGroups[] = [
  ...availableStartingRS,
  PokemonVersionGroups.CRYSTAL,
];

export const availableStartingGS: PokemonVersionGroups[] = [
  ...availableStartingC,
  PokemonVersionGroups.GOLD_SILVER,
];

export const availableStartingY: PokemonVersionGroups[] = [
  ...availableStartingGS,
  PokemonVersionGroups.YELLOW,
];

export const availableStartingRB: PokemonVersionGroups[] = [
  ...availableStartingY,
  PokemonVersionGroups.RED_BLUE,
];

export const versionsWithoutHiddenAbilities: PokemonVersionGroups[] = [
  PokemonVersionGroups.RUBY_SAPPHIRE,
  PokemonVersionGroups.FIRERED_LEAFGREEN,
  PokemonVersionGroups.EMERALD,
  PokemonVersionGroups.DIAMOND_PEARL,
  PokemonVersionGroups.PLATINUM,
  PokemonVersionGroups.HEARTGOLD_SOULSILVER,
];

export const gen1Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.RED_BLUE,
  PokemonVersionGroups.YELLOW,
];

export const gen2Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.GOLD_SILVER,
  PokemonVersionGroups.CRYSTAL,
];

export const gen3Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.RUBY_SAPPHIRE,
  PokemonVersionGroups.FIRERED_LEAFGREEN,
  PokemonVersionGroups.EMERALD,
];

export const gen4Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.DIAMOND_PEARL,
  PokemonVersionGroups.PLATINUM,
  PokemonVersionGroups.HEARTGOLD_SOULSILVER,
];

export const gen5Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.BLACK_WHITE,
  PokemonVersionGroups.BLACK_2_WHITE_2,
];

export const gen6Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.XY,
  PokemonVersionGroups.OMEGA_RUBY_ALPHA_SAPPHIRE,
];

export const gen7Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.SUN_MOON,
  PokemonVersionGroups.ULTRA_SUN_ULTRA_MOON,
];

export const gen8Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.SWORD_SHIELD,
];

export const gen9Games: PokemonVersionGroups[] = [
  PokemonVersionGroups.SCARLET_VIOLET,
];
