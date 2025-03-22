import { EncounterMethod } from "@/data/locations/common";
import { PokemonLocation } from "@/data/locations/location-list";
import { PokemonGame } from "@/data/versions";

export interface LocationMetadata {
  id: string;
  name: string;
}

export type Evolve = {
  method: EncounterMethod.EVOLVE;
};

export type RedBlueEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: PokemonLocation;
  exclusiveTo?: PokemonGame.RED | PokemonGame.BLUE;
};

export type FireRedLeafGreenEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: PokemonLocation;
  exclusiveTo?: PokemonGame.FIRE_RED | PokemonGame.LEAF_GREEN;
};

export type Encounter = Evolve | RedBlueEncounter | FireRedLeafGreenEncounter;
