import { EncounterMethod } from "@/data/locations/common";
import { KantoLocation } from "@/data/locations/regions/kanto/locations";
import { PokemonGame } from "@/data/versions";

export interface LocationMetadata {
  id: string;
  name: string;
}

export type Evolve = {
  method: EncounterMethod.EVOLVE;
};

export type PokemonLocation = KantoLocation;

export type RedBlueEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: KantoLocation;
  exclusiveTo?: PokemonGame.RED | PokemonGame.BLUE;
};

export type FireRedLeafGreenEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: KantoLocation;
  exclusiveTo?: PokemonGame.FIRE_RED | PokemonGame.LEAF_GREEN;
};

export type Encounter = Evolve | RedBlueEncounter | FireRedLeafGreenEncounter;
