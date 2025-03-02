import { Moves } from "@/data/moves/move-list";
import { PokemonType, VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";

export enum MoveCategory {
  PHYSICAL = "PHYSICAL",
  SPECIAL = "SPECIAL",
  STATUS = "STATUS",
}

export interface Move {
  name: Moves;
  displayName: string;
  availableIn: PokemonVersionGroup[];
  type: VersionedProperty<PokemonType>;
  description: VersionedProperty<string>;
  category: VersionedProperty<MoveCategory>;
  power: VersionedProperty<number>;
  accuracy: VersionedProperty<number>;
  pp: VersionedProperty<number>;
}
