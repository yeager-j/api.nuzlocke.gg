import {
  EvolutionTrigger,
  Gender,
  TimeOfDay,
  Weather,
} from "@/data/evolution/common";
import { PokemonFormName } from "@/data/pokemon/names";
import { PokemonType, VersionedProperty } from "@/data/types";

export type EvolutionCondition =
  | { type: "LEVEL"; minLevel: number }
  | { type: "FRIENDSHIP"; minFriendship: number }
  | { type: "HELD_ITEM"; item: string }
  | { type: "MOVE_KNOWN"; move: string }
  | { type: "MOVE_TYPE_KNOWN"; moveType: PokemonType }
  | { type: "LOCATION"; location: string }
  | { type: "TIME_OF_DAY"; timeOfDay: TimeOfDay }
  | { type: "GENDER"; gender: Gender }
  | { type: "WEATHER"; weather: Weather }
  | { type: "PARTY_POKEMON"; pokemon: string }
  | { type: "TRADE_WITH"; pokemon: string }
  | { type: "BEAUTY"; minBeauty: number }
  | {
      type: "MOVE_USAGE";
      description: string;
    }
  | { type: "CRITICAL_HITS"; count: number }
  | { type: "DAMAGE_TAKEN"; description: string }
  | { type: "ABILITY"; ability: string }
  | { type: "ITEM_USE"; item: string }
  | { type: "SPECIAL"; description: string };

export interface EvolutionBranch {
  to: PokemonFormName;
  trigger: EvolutionTrigger;
  conditions: EvolutionCondition[];
}

export interface Evolution {
  from: PokemonFormName | "";
  evolutionBranches: VersionedProperty<EvolutionBranch[]>;
}

export interface VersionedEvolution
  extends Omit<Evolution, "evolutionBranches"> {
  evolutionBranches: EvolutionBranch[];
}
