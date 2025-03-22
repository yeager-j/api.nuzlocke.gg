import { LocationMetadata } from "@/data/locations/types";

export enum PokemonLocation {
  KANTO_ROUTE_1 = "KANTO_ROUTE_1",
  KANTO_ROUTE_2 = "KANTO_ROUTE_2",
  KANTO_ROUTE_3 = "KANTO_ROUTE_3",
  KANTO_ROUTE_4 = "KANTO_ROUTE_4",
  KANTO_ROUTE_5 = "KANTO_ROUTE_5",
  KANTO_ROUTE_6 = "KANTO_ROUTE_6",
  KANTO_ROUTE_7 = "KANTO_ROUTE_7",
  KANTO_ROUTE_8 = "KANTO_ROUTE_8",
  KANTO_ROUTE_9 = "KANTO_ROUTE_9",
  KANTO_ROUTE_10 = "KANTO_ROUTE_10",
  KANTO_ROUTE_11 = "KANTO_ROUTE_11",
  KANTO_ROUTE_12 = "KANTO_ROUTE_12",
  KANTO_ROUTE_13 = "KANTO_ROUTE_13",
  KANTO_ROUTE_14 = "KANTO_ROUTE_14",
  KANTO_ROUTE_15 = "KANTO_ROUTE_15",
  KANTO_ROUTE_16 = "KANTO_ROUTE_16",
  KANTO_ROUTE_17 = "KANTO_ROUTE_17",
  KANTO_ROUTE_18 = "KANTO_ROUTE_18",
  KANTO_ROUTE_19 = "KANTO_ROUTE_19",
  KANTO_ROUTE_20 = "KANTO_ROUTE_20",
  KANTO_ROUTE_21 = "KANTO_ROUTE_21",
  KANTO_ROUTE_22 = "KANTO_ROUTE_22",
  KANTO_ROUTE_23 = "KANTO_ROUTE_23",
  KANTO_ROUTE_24 = "KANTO_ROUTE_24",
  KANTO_ROUTE_25 = "KANTO_ROUTE_25",
  KANTO_ROUTE_26 = "KANTO_ROUTE_26",
  KANTO_ROUTE_27 = "KANTO_ROUTE_27",
  KANTO_ROUTE_28 = "KANTO_ROUTE_28",
  KANTO_BERRY_FOREST = "KANTO_BERRY_FOREST",
  KANTO_BOND_BRIDGE = "KANTO_BOND_BRIDGE",
  KANTO_CANYON_ENTRANCE = "KANTO_CANYON_ENTRANCE",
  KANTO_CAPE_BRINK = "KANTO_CAPE_BRINK",
  KANTO_CELADON_CITY = "KANTO_CELADON_CITY",
  KANTO_CERULEAN_CAVE = "KANTO_CERULEAN_CAVE",
  KANTO_CERULEAN_CITY = "KANTO_CERULEAN_CITY",
  KANTO_CINNABAR_ISLAND = "KANTO_CINNABAR_ISLAND",
  KANTO_DIGLETTS_CAVE = "KANTO_DIGLETTS_CAVE",
  KANTO_DOTTED_HOLE = "KANTO_DOTTED_HOLE",
  KANTO_FIVE_ISLAND = "KANTO_FIVE_ISLAND",
  KANTO_FIVE_ISLE_MEADOW = "KANTO_FIVE_ISLE_MEADOW",
  KANTO_FOUR_ISLAND = "KANTO_FOUR_ISLAND",
  KANTO_FUCHSIA_CITY = "KANTO_FUCHSIA_CITY",
  KANTO_GREEN_PATH = "KANTO_GREEN_PATH",
  KANTO_ICEFALL_CAVE = "KANTO_ICEFALL_CAVE",
  KANTO_INDIGO_PLATEAU = "KANTO_INDIGO_PLATEAU",
  KANTO_KINDLE_ROAD = "KANTO_KINDLE_ROAD",
  KANTO_LAVENDER_TOWN = "KANTO_LAVENDER_TOWN",
  KANTO_LOST_CAVE = "KANTO_LOST_CAVE",
  KANTO_MEMORIAL_PILLAR = "KANTO_MEMORIAL_PILLAR",
  KANTO_MT_EMBER = "KANTO_MT_EMBER",
  KANTO_MT_MOON = "KANTO_MT_MOON",
  KANTO_NAVEL_ROCK = "KANTO_NAVEL_ROCK",
  KANTO_ONE_ISLAND = "KANTO_ONE_ISLAND",
  KANTO_OUTCAST_ISLAND = "KANTO_OUTCAST_ISLAND",
  KANTO_PALLET_TOWN = "KANTO_PALLET_TOWN",
  KANTO_PATTERN_BUSH = "KANTO_PATTERN_BUSH",
  KANTO_PEWTER_CITY = "KANTO_PEWTER_CITY",
  KANTO_POKEMON_MANSION = "KANTO_POKEMON_MANSION",
  KANTO_POKEMON_TOWER = "KANTO_POKEMON_TOWER",
  KANTO_POWER_PLANT = "KANTO_POWER_PLANT",
  KANTO_RESORT_GORGEOUS = "KANTO_RESORT_GORGEOUS",
  KANTO_ROAMING_KANTO = "KANTO_ROAMING_KANTO",
  KANTO_ROCK_TUNNEL = "KANTO_ROCK_TUNNEL",
  KANTO_ROCKET_HIDEOUT = "KANTO_ROCKET_HIDEOUT",
  KANTO_ROCKET_WAREHOUSE = "KANTO_ROCKET_WAREHOUSE",
  KANTO_RUIN_VALLEY = "KANTO_RUIN_VALLEY",
  KANTO_SAFARI_ZONE = "KANTO_SAFARI_ZONE",
  KANTO_SAFFRON_CITY = "KANTO_SAFFRON_CITY",
  KANTO_SEAFOAM_ISLANDS = "KANTO_SEAFOAM_ISLANDS",
  KANTO_SEVAULT_CANYON = "KANTO_SEVAULT_CANYON",
  KANTO_SEVEN_ISLAND = "KANTO_SEVEN_ISLAND",
  KANTO_SILPH_CO = "KANTO_SILPH_CO",
  KANTO_SIX_ISLAND = "KANTO_SIX_ISLAND",
  KANTO_SS_ANNE = "KANTO_SS_ANNE",
  KANTO_TANOBY_RUINS = "KANTO_TANOBY_RUINS",
  KANTO_THREE_ISLAND = "KANTO_THREE_ISLAND",
  KANTO_THREE_ISLE_PATH = "KANTO_THREE_ISLE_PATH",
  KANTO_THREE_ISLE_PORT = "KANTO_THREE_ISLE_PORT",
  KANTO_TOHJO_FALLS = "KANTO_TOHJO_FALLS",
  KANTO_TRAINER_TOWER = "KANTO_TRAINER_TOWER",
  KANTO_TREASURE_BEACH = "KANTO_TREASURE_BEACH",
  KANTO_TWO_ISLAND = "KANTO_TWO_ISLAND",
  KANTO_UNDERGROUND_PATH_5_6 = "KANTO_UNDERGROUND_PATH_5_6",
  KANTO_UNDERGROUND_PATH_7_8 = "KANTO_UNDERGROUND_PATH_7_8",
  KANTO_VERMILION_CITY = "KANTO_VERMILION_CITY",
  KANTO_VICTORY_ROAD = "KANTO_VICTORY_ROAD",
  KANTO_VIRIDIAN_CITY = "KANTO_VIRIDIAN_CITY",
  KANTO_VIRIDIAN_FOREST = "KANTO_VIRIDIAN_FOREST",
  KANTO_WATER_LABYRINTH = "KANTO_WATER_LABYRINTH",
  KANTO_WATER_PATH = "KANTO_WATER_PATH",
}

export const LocationData: Record<PokemonLocation, LocationMetadata> = {
  [PokemonLocation.KANTO_ROUTE_1]: {
    id: "route-1",
    name: "Route 1",
  },
  [PokemonLocation.KANTO_ROUTE_2]: {
    id: "route-2",
    name: "Route 2",
  },
  [PokemonLocation.KANTO_ROUTE_3]: {
    id: "route-3",
    name: "Route 3",
  },
  [PokemonLocation.KANTO_ROUTE_4]: {
    id: "route-4",
    name: "Route 4",
  },
  [PokemonLocation.KANTO_ROUTE_5]: {
    id: "route-5",
    name: "Route 5",
  },
  [PokemonLocation.KANTO_ROUTE_6]: {
    id: "route-6",
    name: "Route 6",
  },
  [PokemonLocation.KANTO_ROUTE_7]: {
    id: "route-7",
    name: "Route 7",
  },
  [PokemonLocation.KANTO_ROUTE_8]: {
    id: "route-8",
    name: "Route 8",
  },
  [PokemonLocation.KANTO_ROUTE_9]: {
    id: "route-9",
    name: "Route 9",
  },
  [PokemonLocation.KANTO_ROUTE_10]: {
    id: "route-10",
    name: "Route 10",
  },
  [PokemonLocation.KANTO_ROUTE_11]: {
    id: "route-11",
    name: "Route 11",
  },
  [PokemonLocation.KANTO_ROUTE_12]: {
    id: "route-12",
    name: "Route 12",
  },
  [PokemonLocation.KANTO_ROUTE_13]: {
    id: "route-13",
    name: "Route 13",
  },
  [PokemonLocation.KANTO_ROUTE_14]: {
    id: "route-14",
    name: "Route 14",
  },
  [PokemonLocation.KANTO_ROUTE_15]: {
    id: "route-15",
    name: "Route 15",
  },
  [PokemonLocation.KANTO_ROUTE_16]: {
    id: "route-16",
    name: "Route 16",
  },
  [PokemonLocation.KANTO_ROUTE_17]: {
    id: "route-17",
    name: "Route 17",
  },
  [PokemonLocation.KANTO_ROUTE_18]: {
    id: "route-18",
    name: "Route 18",
  },
  [PokemonLocation.KANTO_ROUTE_19]: {
    id: "route-19",
    name: "Route 19",
  },
  [PokemonLocation.KANTO_ROUTE_20]: {
    id: "route-20",
    name: "Route 20",
  },
  [PokemonLocation.KANTO_ROUTE_21]: {
    id: "route-21",
    name: "Route 21",
  },
  [PokemonLocation.KANTO_ROUTE_22]: {
    id: "route-22",
    name: "Route 22",
  },
  [PokemonLocation.KANTO_ROUTE_23]: {
    id: "route-23",
    name: "Route 23",
  },
  [PokemonLocation.KANTO_ROUTE_24]: {
    id: "route-24",
    name: "Route 24",
  },
  [PokemonLocation.KANTO_ROUTE_25]: {
    id: "route-25",
    name: "Route 25",
  },
  [PokemonLocation.KANTO_ROUTE_26]: {
    id: "route-26",
    name: "Route 26",
  },
  [PokemonLocation.KANTO_ROUTE_27]: {
    id: "route-27",
    name: "Route 27",
  },
  [PokemonLocation.KANTO_ROUTE_28]: {
    id: "route-28",
    name: "Route 28",
  },
  [PokemonLocation.KANTO_BERRY_FOREST]: {
    id: "berry-forest",
    name: "Berry Forest",
  },
  [PokemonLocation.KANTO_BOND_BRIDGE]: {
    id: "bond-bridge",
    name: "Bond Bridge",
  },
  [PokemonLocation.KANTO_CANYON_ENTRANCE]: {
    id: "canyon-entrance",
    name: "Canyon Entrance",
  },
  [PokemonLocation.KANTO_CAPE_BRINK]: {
    id: "cape-brink",
    name: "Cape Brink",
  },
  [PokemonLocation.KANTO_CELADON_CITY]: {
    id: "celadon-city",
    name: "Celadon City",
  },
  [PokemonLocation.KANTO_CERULEAN_CAVE]: {
    id: "cerulean-cave",
    name: "Cerulean Cave",
  },
  [PokemonLocation.KANTO_CERULEAN_CITY]: {
    id: "cerulean-city",
    name: "Cerulean City",
  },
  [PokemonLocation.KANTO_CINNABAR_ISLAND]: {
    id: "cinnabar-island",
    name: "Cinnabar Island",
  },
  [PokemonLocation.KANTO_DIGLETTS_CAVE]: {
    id: "digletts-cave",
    name: "Diglett's Cave",
  },
  [PokemonLocation.KANTO_DOTTED_HOLE]: {
    id: "dotted-hole",
    name: "Dotted Hole",
  },
  [PokemonLocation.KANTO_FIVE_ISLAND]: {
    id: "five-island",
    name: "Five Island",
  },
  [PokemonLocation.KANTO_FIVE_ISLE_MEADOW]: {
    id: "five-isle-meadow",
    name: "Five Isle Meadow",
  },
  [PokemonLocation.KANTO_FOUR_ISLAND]: {
    id: "four-island",
    name: "Four Island",
  },
  [PokemonLocation.KANTO_FUCHSIA_CITY]: {
    id: "fuchsia-city",
    name: "Fuchsia City",
  },
  [PokemonLocation.KANTO_GREEN_PATH]: {
    id: "green-path",
    name: "Green Path",
  },
  [PokemonLocation.KANTO_ICEFALL_CAVE]: {
    id: "icefall-cave",
    name: "Icefall Cave",
  },
  [PokemonLocation.KANTO_INDIGO_PLATEAU]: {
    id: "indigo-plateau",
    name: "Indigo Plateau",
  },
  [PokemonLocation.KANTO_KINDLE_ROAD]: {
    id: "kindle-road",
    name: "Kindle Road",
  },
  [PokemonLocation.KANTO_LAVENDER_TOWN]: {
    id: "lavender-town",
    name: "Lavender Town",
  },
  [PokemonLocation.KANTO_LOST_CAVE]: {
    id: "lost-cave",
    name: "Lost Cave",
  },
  [PokemonLocation.KANTO_MEMORIAL_PILLAR]: {
    id: "memorial-pillar",
    name: "Memorial Pillar",
  },
  [PokemonLocation.KANTO_MT_EMBER]: {
    id: "mt-ember",
    name: "Mt. Ember",
  },
  [PokemonLocation.KANTO_MT_MOON]: {
    id: "mt-moon",
    name: "Mt. Moon",
  },
  [PokemonLocation.KANTO_NAVEL_ROCK]: {
    id: "navel-rock",
    name: "Navel Rock",
  },
  [PokemonLocation.KANTO_ONE_ISLAND]: {
    id: "one-island",
    name: "One Island",
  },
  [PokemonLocation.KANTO_OUTCAST_ISLAND]: {
    id: "outcast-island",
    name: "Outcast Island",
  },
  [PokemonLocation.KANTO_PALLET_TOWN]: {
    id: "pallet-town",
    name: "Pallet Town",
  },
  [PokemonLocation.KANTO_PATTERN_BUSH]: {
    id: "pattern-bush",
    name: "Pattern Bush",
  },
  [PokemonLocation.KANTO_PEWTER_CITY]: {
    id: "pewter-city",
    name: "Pewter City",
  },
  [PokemonLocation.KANTO_POKEMON_MANSION]: {
    id: "pokemon-mansion",
    name: "Pokemon Mansion",
  },
  [PokemonLocation.KANTO_POKEMON_TOWER]: {
    id: "pokemon-tower",
    name: "Pokemon Tower",
  },
  [PokemonLocation.KANTO_POWER_PLANT]: {
    id: "power-plant",
    name: "Power Plant",
  },
  [PokemonLocation.KANTO_RESORT_GORGEOUS]: {
    id: "resort-gorgeous",
    name: "Resort Gorgeous",
  },
  [PokemonLocation.KANTO_ROAMING_KANTO]: {
    id: "roaming-kanto",
    name: "Roaming Kanto",
  },
  [PokemonLocation.KANTO_ROCK_TUNNEL]: {
    id: "rock-tunnel",
    name: "Rock Tunnel",
  },
  [PokemonLocation.KANTO_ROCKET_HIDEOUT]: {
    id: "rocket-hideout",
    name: "Rocket Hideout",
  },
  [PokemonLocation.KANTO_ROCKET_WAREHOUSE]: {
    id: "rocket-warehouse",
    name: "Rocket Warehouse",
  },
  [PokemonLocation.KANTO_RUIN_VALLEY]: {
    id: "ruin-valley",
    name: "Ruin Valley",
  },
  [PokemonLocation.KANTO_SAFARI_ZONE]: {
    id: "safari-zone",
    name: "Safari Zone",
  },
  [PokemonLocation.KANTO_SAFFRON_CITY]: {
    id: "saffron-city",
    name: "Saffron City",
  },
  [PokemonLocation.KANTO_SEAFOAM_ISLANDS]: {
    id: "seafoam-islands",
    name: "Seafoam Islands",
  },
  [PokemonLocation.KANTO_SEVAULT_CANYON]: {
    id: "sevault-canyon",
    name: "Sevault Canyon",
  },
  [PokemonLocation.KANTO_SEVEN_ISLAND]: {
    id: "seven-island",
    name: "Seven Island",
  },
  [PokemonLocation.KANTO_SILPH_CO]: {
    id: "silph-co",
    name: "Silph Co.",
  },
  [PokemonLocation.KANTO_SIX_ISLAND]: {
    id: "six-island",
    name: "Six Island",
  },
  [PokemonLocation.KANTO_SS_ANNE]: {
    id: "ss-anne",
    name: "SS Anne",
  },
  [PokemonLocation.KANTO_TANOBY_RUINS]: {
    id: "tanoby-ruins",
    name: "Tanoby Ruins",
  },
  [PokemonLocation.KANTO_THREE_ISLAND]: {
    id: "three-island",
    name: "Three Island",
  },
  [PokemonLocation.KANTO_THREE_ISLE_PATH]: {
    id: "three-isle-path",
    name: "Three Isle Path",
  },
  [PokemonLocation.KANTO_THREE_ISLE_PORT]: {
    id: "three-isle-port",
    name: "Three Isle Port",
  },
  [PokemonLocation.KANTO_TOHJO_FALLS]: {
    id: "tohjo-falls",
    name: "Tohjo Falls",
  },
  [PokemonLocation.KANTO_TRAINER_TOWER]: {
    id: "trainer-tower",
    name: "Trainer Tower",
  },
  [PokemonLocation.KANTO_TREASURE_BEACH]: {
    id: "treasure-beach",
    name: "Treasure Beach",
  },
  [PokemonLocation.KANTO_TWO_ISLAND]: {
    id: "two-island",
    name: "Two Island",
  },
  [PokemonLocation.KANTO_UNDERGROUND_PATH_5_6]: {
    id: "underground-path-5-6",
    name: "Underground Path (Routes 5-6)",
  },
  [PokemonLocation.KANTO_UNDERGROUND_PATH_7_8]: {
    id: "underground-path-7-8",
    name: "Underground Path (Routes 7-8)",
  },
  [PokemonLocation.KANTO_VERMILION_CITY]: {
    id: "vermilion-city",
    name: "Vermilion City",
  },
  [PokemonLocation.KANTO_VICTORY_ROAD]: {
    id: "victory-road",
    name: "Victory Road",
  },
  [PokemonLocation.KANTO_VIRIDIAN_CITY]: {
    id: "viridian-city",
    name: "Viridian City",
  },
  [PokemonLocation.KANTO_VIRIDIAN_FOREST]: {
    id: "viridian-forest",
    name: "Viridian Forest",
  },
  [PokemonLocation.KANTO_WATER_LABYRINTH]: {
    id: "water-labyrinth",
    name: "Water Labyrinth",
  },
  [PokemonLocation.KANTO_WATER_PATH]: {
    id: "water-path",
    name: "Water Path",
  },
};
