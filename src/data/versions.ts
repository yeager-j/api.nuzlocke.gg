import { PokemonGameMetadata, VersionGroupMetadata } from "@/data/types";

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

export enum PokemonGame {
  RED = "RED",
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  GOLD = "GOLD",
  SILVER = "SILVER",
  CRYSTAL = "CRYSTAL",
  RUBY = "RUBY",
  SAPPHIRE = "SAPPHIRE",
  EMERALD = "EMERALD",
  FIRE_RED = "FIRE_RED",
  LEAF_GREEN = "LEAF_GREEN",
  DIAMOND = "DIAMOND",
  PEARL = "PEARL",
  PLATINUM = "PLATINUM",
  HEART_GOLD = "HEART_GOLD",
  SOUL_SILVER = "SOUL_SILVER",
  BLACK = "BLACK",
  WHITE = "WHITE",
  BLACK_2 = "BLACK_2",
  WHITE_2 = "WHITE_2",
  X = "X",
  Y = "Y",
  OMEGA_RUBY = "OMEGA_RUBY",
  ALPHA_SAPPHIRE = "ALPHA_SAPPHIRE",
  SUN = "SUN",
  MOON = "MOON",
  ULTRA_SUN = "ULTRA_SUN",
  ULTRA_MOON = "ULTRA_MOON",
  SWORD = "SWORD",
  SHIELD = "SHIELD",
  SCARLET = "SCARLET",
  VIOLET = "VIOLET",
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

export const PokemonGameData: Record<PokemonGame, PokemonGameMetadata> = {
  [PokemonGame.RED]: {
    id: "red",
    name: "Pokémon Red",
    versionGroup: PokemonVersionGroup.RED_BLUE,
  },
  [PokemonGame.BLUE]: {
    id: "blue",
    name: "Pokémon Blue",
    versionGroup: PokemonVersionGroup.RED_BLUE,
  },
  [PokemonGame.YELLOW]: {
    id: "yellow",
    name: "Pokémon Yellow",
    versionGroup: PokemonVersionGroup.YELLOW,
  },
  [PokemonGame.GOLD]: {
    id: "gold",
    name: "Pokémon Gold",
    versionGroup: PokemonVersionGroup.GOLD_SILVER,
  },
  [PokemonGame.SILVER]: {
    id: "silver",
    name: "Pokémon Silver",
    versionGroup: PokemonVersionGroup.GOLD_SILVER,
  },
  [PokemonGame.CRYSTAL]: {
    id: "crystal",
    name: "Pokémon Crystal",
    versionGroup: PokemonVersionGroup.CRYSTAL,
  },
  [PokemonGame.RUBY]: {
    id: "ruby",
    name: "Pokémon Ruby",
    versionGroup: PokemonVersionGroup.RUBY_SAPPHIRE,
  },
  [PokemonGame.SAPPHIRE]: {
    id: "sapphire",
    name: "Pokémon Sapphire",
    versionGroup: PokemonVersionGroup.RUBY_SAPPHIRE,
  },
  [PokemonGame.FIRE_RED]: {
    id: "firered",
    name: "Pokémon FireRed",
    versionGroup: PokemonVersionGroup.FIRERED_LEAFGREEN,
  },
  [PokemonGame.LEAF_GREEN]: {
    id: "leafgreen",
    name: "Pokémon LeafGreen",
    versionGroup: PokemonVersionGroup.FIRERED_LEAFGREEN,
  },
  [PokemonGame.EMERALD]: {
    id: "emerald",
    name: "Pokémon Emerald",
    versionGroup: PokemonVersionGroup.EMERALD,
  },
  [PokemonGame.DIAMOND]: {
    id: "diamond",
    name: "Pokémon Diamond",
    versionGroup: PokemonVersionGroup.DIAMOND_PEARL,
  },
  [PokemonGame.PEARL]: {
    id: "pearl",
    name: "Pokémon Pearl",
    versionGroup: PokemonVersionGroup.DIAMOND_PEARL,
  },
  [PokemonGame.PLATINUM]: {
    id: "platinum",
    name: "Pokémon Platinum",
    versionGroup: PokemonVersionGroup.PLATINUM,
  },
  [PokemonGame.HEART_GOLD]: {
    id: "heartgold",
    name: "Pokémon HeartGold",
    versionGroup: PokemonVersionGroup.HEARTGOLD_SOULSILVER,
  },
  [PokemonGame.SOUL_SILVER]: {
    id: "soulsilver",
    name: "Pokémon SoulSilver",
    versionGroup: PokemonVersionGroup.HEARTGOLD_SOULSILVER,
  },
  [PokemonGame.BLACK]: {
    id: "black",
    name: "Pokémon Black",
    versionGroup: PokemonVersionGroup.BLACK_WHITE,
  },
  [PokemonGame.WHITE]: {
    id: "white",
    name: "Pokémon White",
    versionGroup: PokemonVersionGroup.BLACK_WHITE,
  },
  [PokemonGame.BLACK_2]: {
    id: "black-2",
    name: "Pokémon Black 2",
    versionGroup: PokemonVersionGroup.BLACK_2_WHITE_2,
  },
  [PokemonGame.WHITE_2]: {
    id: "white-2",
    name: "Pokémon White 2",
    versionGroup: PokemonVersionGroup.BLACK_2_WHITE_2,
  },
  [PokemonGame.X]: {
    id: "x",
    name: "Pokémon X",
    versionGroup: PokemonVersionGroup.XY,
  },
  [PokemonGame.Y]: {
    id: "y",
    name: "Pokémon Y",
    versionGroup: PokemonVersionGroup.XY,
  },
  [PokemonGame.OMEGA_RUBY]: {
    id: "omega-ruby",
    name: "Pokémon Omega Ruby",
    versionGroup: PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
  },
  [PokemonGame.ALPHA_SAPPHIRE]: {
    id: "alpha-sapphire",
    name: "Pokémon Alpha Sapphire",
    versionGroup: PokemonVersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE,
  },
  [PokemonGame.SUN]: {
    id: "sun",
    name: "Pokémon Sun",
    versionGroup: PokemonVersionGroup.SUN_MOON,
  },
  [PokemonGame.MOON]: {
    id: "moon",
    name: "Pokémon Moon",
    versionGroup: PokemonVersionGroup.SUN_MOON,
  },
  [PokemonGame.ULTRA_SUN]: {
    id: "ultra-sun",
    name: "Pokémon Ultra Sun",
    versionGroup: PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON,
  },
  [PokemonGame.ULTRA_MOON]: {
    id: "ultra-moon",
    name: "Pokémon Ultra Moon",
    versionGroup: PokemonVersionGroup.ULTRA_SUN_ULTRA_MOON,
  },
  [PokemonGame.SWORD]: {
    id: "sword",
    name: "Pokémon Sword",
    versionGroup: PokemonVersionGroup.SWORD_SHIELD,
  },
  [PokemonGame.SHIELD]: {
    id: "shield",
    name: "Pokémon Shield",
    versionGroup: PokemonVersionGroup.SWORD_SHIELD,
  },
  [PokemonGame.SCARLET]: {
    id: "scarlet",
    name: "Pokémon Scarlet",
    versionGroup: PokemonVersionGroup.SCARLET_VIOLET,
  },
  [PokemonGame.VIOLET]: {
    id: "violet",
    name: "Pokémon Violet",
    versionGroup: PokemonVersionGroup.SCARLET_VIOLET,
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
