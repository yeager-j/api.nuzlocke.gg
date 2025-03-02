/**
 * Core evolution triggers that can cause a Pokemon to evolve
 */
export enum EvolutionTrigger {
  LEVEL_UP = "LEVEL_UP",
  TRADE = "TRADE",
  ITEM_USE = "ITEM_USE",
  SPECIAL = "SPECIAL", // For unique evolution mechanics
}

/**
 * Time of day requirements for evolution
 */
export enum TimeOfDay {
  ANY = "ANY",
  DAY = "DAY",
  NIGHT = "NIGHT",
  DUSK = "DUSK", // Special case for Rockruff -> Lycanroc Dusk Form
}

/**
 * Weather conditions that can affect evolution
 */
export enum Weather {
  ANY = "ANY",
  RAIN = "RAIN",
  THUNDERSTORM = "THUNDERSTORM",
  SNOW = "SNOW",
  HARSH_SUNLIGHT = "HARSH_SUNLIGHT",
  SANDSTORM = "SANDSTORM",
  FOG = "FOG",
}

/**
 * Gender-specific evolution requirements
 */
export enum Gender {
  ANY = "ANY",
  MALE = "MALE",
  FEMALE = "FEMALE",
}
