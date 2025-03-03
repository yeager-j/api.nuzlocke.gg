import { KantoLocationData } from "@/data/locations/regions/kanto/locations";

export enum EncounterMethod {
  TALL_GRASS = "TALL_GRASS",
  CAVE = "CAVE",
  FISHING = "FISHING",
  SURFING = "SURFING",
  INTERACT = "INTERACT",
  TRADE = "TRADE",
  GIFT = "GIFT",
  EVOLVE = "EVOLVE",
}

export const EncounterMethodNames = {
  [EncounterMethod.TALL_GRASS]: "Tall Grass",
  [EncounterMethod.CAVE]: "Cave",
  [EncounterMethod.FISHING]: "Fishing",
  [EncounterMethod.SURFING]: "Surfing",
  [EncounterMethod.INTERACT]: "Interact",
  [EncounterMethod.TRADE]: "Trade",
  [EncounterMethod.GIFT]: "Gift",
  [EncounterMethod.EVOLVE]: "Evolution",
};

export const PokemonLocationData = {
  ...KantoLocationData,
};
