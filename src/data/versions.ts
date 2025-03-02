import { VersionGroupMetadata } from "@/data/types";

export enum PokemonVersionGroup {
  RED_BLUE = "RED_BLUE",
  YELLOW = "YELLOW",
  GOLD_SILVER = "GOLD_SILVER",
  CRYSTAL = "CRYSTAL",
  RUBY_SAPPHIRE = "RUBY_SAPPHIRE",
  FIRERED_LEAFGREEN = "FIRERED_LEAFGREEN",
  EMERALD = "EMERALD",
  DIAMOND_PEARL = "DIAMOND_PEARL",
  PLATINUM = "PLATINUM",
  HEARTGOLD_SOULSILVER = "HEARTGOLD_SOULSILVER",
  BLACK_WHITE = "BLACK_WHITE",
  BLACK_2_WHITE_2 = "BLACK_2_WHITE_2",
  XY = "XY",
  OMEGA_RUBY_ALPHA_SAPPHIRE = "OMEGA_RUBY_ALPHA_SAPPHIRE",
  SUN_MOON = "SUN_MOON",
  ULTRA_SUN_ULTRA_MOON = "ULTRA_SUN_ULTRA_MOON",
  SWORD_SHIELD = "SWORD_SHIELD",
  SCARLET_VIOLET = "SCARLET_VIOLET",
}

export const PokemonVersionGroupData: Record<
  PokemonVersionGroup,
  VersionGroupMetadata
> = {
  [PokemonVersionGroup.RED_BLUE]: {
    id: "red-blue",
    name: "Red & Blue",
    order: 1,
  },
  [PokemonVersionGroup.YELLOW]: {
    id: "yellow",
    name: "Yellow",
    order: 2,
  },
  [PokemonVersionGroup.GOLD_SILVER]: {
    id: "gold-silver",
    name: "Gold & Silver",
    order: 3,
  },
  [PokemonVersionGroup.CRYSTAL]: {
    id: "crystal",
    name: "Crystal",
    order: 4,
  },
  [PokemonVersionGroup.RUBY_SAPPHIRE]: {
    id: "ruby-sapphire",
    name: "Ruby & Sapphire",
    order: 5,
  },
  [PokemonVersionGroup.FIRERED_LEAFGREEN]: {
    id: "firered-leafgreen",
    name: "FireRed & LeafGreen",
    order: 6,
  },
  [PokemonVersionGroup.EMERALD]: {
    id: "emerald",
    name: "Emerald",
    order: 7,
  },
  [PokemonVersionGroup.DIAMOND_PEARL]: {
    id: "diamond-pearl",
    name: "Diamond & Pearl",
    order: 8,
  },
  [PokemonVersionGroup.PLATINUM]: {
    id: "platinum",
    name: "Platinum",
    order: 9,
  },
  [PokemonVersionGroup.HEARTGOLD_SOULSILVER]: {
    id: "heartgold-soulsilver",
    name: "HeartGold & SoulSilver",
    order: 10,
  },
  [PokemonVersionGroup.BLACK_WHITE]: {
    id: "black-white",
    name: "Black & White",
    order: 11,
  },
  [PokemonVersionGroup.BLACK_2_WHITE_2]: {
    id: "black-2-white-2",
    name: "Black 2 & White 2",
    order: 12,
  },
  [PokemonVersionGroup.XY]: {
    id: "xy",
    name: "X & Y",
    order: 13,
  },
  [PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]: {
    id: "omega-ruby-alpha-sapphire",
    name: "Omega Ruby & Alpha Sapphire",
    order: 14,
  },
  [PokemonVersionGroup.SUN_MOON]: {
    id: "sun-moon",
    name: "Sun & Moon",
    order: 15,
  },
  [PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON]: {
    id: "ultra-sun-ultra-moon",
    name: "Ultra Sun & Ultra Moon",
    order: 16,
  },
  [PokemonVersionGroup.SWORD_SHIELD]: {
    id: "sword-shield",
    name: "Sword & Shield",
    order: 17,
  },
  [PokemonVersionGroup.SCARLET_VIOLET]: {
    id: "scarlet-violet",
    name: "Scarlet & Violet",
    order: 18,
  },
};

export const availableStartingUSUM: PokemonVersionGroup[] = [
  PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON,
];

export const availableStartingSM: PokemonVersionGroup[] = [
  ...availableStartingUSUM,
  PokemonVersionGroup.SUN_MOON,
];

export const availableStartingORAS: PokemonVersionGroup[] = [
  ...availableStartingSM,
  PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
];

export const availableStartingXY: PokemonVersionGroup[] = [
  ...availableStartingORAS,
  PokemonVersionGroup.XY,
];

export const availableStartingB2W2: PokemonVersionGroup[] = [
  ...availableStartingXY,
  PokemonVersionGroup.BLACK_2_WHITE_2,
];

export const availableStartingBW: PokemonVersionGroup[] = [
  ...availableStartingB2W2,
  PokemonVersionGroup.BLACK_WHITE,
];

export const availableStartingHGSS: PokemonVersionGroup[] = [
  ...availableStartingBW,
  PokemonVersionGroup.HEARTGOLD_SOULSILVER,
];

export const availableStartingPt: PokemonVersionGroup[] = [
  ...availableStartingHGSS,
  PokemonVersionGroup.PLATINUM,
];

export const availableStartingDP: PokemonVersionGroup[] = [
  ...availableStartingPt,
  PokemonVersionGroup.DIAMOND_PEARL,
];

export const availableStartingE: PokemonVersionGroup[] = [
  ...availableStartingDP,
  PokemonVersionGroup.EMERALD,
];

export const availableStartingFRLG: PokemonVersionGroup[] = [
  ...availableStartingE,
  PokemonVersionGroup.FIRERED_LEAFGREEN,
];

export const availableStartingRS: PokemonVersionGroup[] = [
  ...availableStartingFRLG,
  PokemonVersionGroup.RUBY_SAPPHIRE,
];

export const availableStartingC: PokemonVersionGroup[] = [
  ...availableStartingRS,
  PokemonVersionGroup.CRYSTAL,
];

export const availableStartingGS: PokemonVersionGroup[] = [
  ...availableStartingC,
  PokemonVersionGroup.GOLD_SILVER,
];

export const availableStartingY: PokemonVersionGroup[] = [
  ...availableStartingGS,
  PokemonVersionGroup.YELLOW,
];

export const availableStartingRB: PokemonVersionGroup[] = [
  ...availableStartingY,
  PokemonVersionGroup.RED_BLUE,
];

export const versionsWithoutHiddenAbilities: PokemonVersionGroup[] = [
  PokemonVersionGroup.RUBY_SAPPHIRE,
  PokemonVersionGroup.FIRERED_LEAFGREEN,
  PokemonVersionGroup.EMERALD,
  PokemonVersionGroup.DIAMOND_PEARL,
  PokemonVersionGroup.PLATINUM,
  PokemonVersionGroup.HEARTGOLD_SOULSILVER,
];

export const gen1Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.RED_BLUE,
  PokemonVersionGroup.YELLOW,
];

export const gen2Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.GOLD_SILVER,
  PokemonVersionGroup.CRYSTAL,
];

export const gen3Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.RUBY_SAPPHIRE,
  PokemonVersionGroup.FIRERED_LEAFGREEN,
  PokemonVersionGroup.EMERALD,
];

export const gen4Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.DIAMOND_PEARL,
  PokemonVersionGroup.PLATINUM,
  PokemonVersionGroup.HEARTGOLD_SOULSILVER,
];

export const gen5Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.BLACK_WHITE,
  PokemonVersionGroup.BLACK_2_WHITE_2,
];

export const gen6Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.XY,
  PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
];

export const gen7Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.SUN_MOON,
  PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON,
];

export const gen8Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.SWORD_SHIELD,
];

export const gen9Games: PokemonVersionGroup[] = [
  PokemonVersionGroup.SCARLET_VIOLET,
];

export const gamesWithMegaEvolution: PokemonVersionGroup[] = [...gen6Games];

export const gamesWithGigantamax: PokemonVersionGroup[] = [...gen8Games];
