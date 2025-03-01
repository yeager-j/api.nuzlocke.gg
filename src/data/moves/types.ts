import { Moves } from "@/data/moves/move-list";
import { VersionedProperty } from "@/data/types";
import { PokemonVersionGroups } from "@/data/versions";

export enum MoveCategory {
  PHYSICAL = "PHYSICAL",
  SPECIAL = "SPECIAL",
  STATUS = "STATUS",
}

export interface Move {
  name: Moves;
  displayName: string;
  availableIn: PokemonVersionGroups[];
  description: VersionedProperty<string>;
  category: VersionedProperty<MoveCategory>;
  power: VersionedProperty<number>;
  accuracy: VersionedProperty<number>;
  pp: VersionedProperty<number>;
}
