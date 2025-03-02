import {
  EvolutionTrigger,
  Gender,
  TimeOfDay,
  Weather,
} from "@/data/pokemon/common";
import {
  PokemonFormName,
  PokemonModeName,
  PokemonSpeciesName,
} from "@/data/pokemon/names";
import { PokemonType, VersionedProperty } from "@/data/types";
import { PokemonVersionGroup } from "@/data/versions";

/**
 * Discriminated union of all possible evolution conditions
 */
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

/**
 * Complete evolution data for a Pokemon species
 */
export interface Evolution {
  from: PokemonFormName | "";
  evolutionBranches: VersionedProperty<EvolutionBranch[]>;
}

export interface VersionedEvolution
  extends Omit<Evolution, "evolutionBranches"> {
  evolutionBranches: EvolutionBranch[];
}

interface PokemonCommon<T extends string> {
  name: T;
  displayName: string;
  availableIn: PokemonVersionGroup[];
}

export interface PokemonMode extends PokemonCommon<PokemonModeName> {
  sprite: string;
  isDefault: boolean;
  types: VersionedProperty<[PokemonType] | [PokemonType, PokemonType]>;
}

export interface VersionedPokemonMode
  extends Omit<PokemonMode, "types" | "availableIn"> {
  types: [PokemonType] | [PokemonType, PokemonType];
}

export interface PokemonSpecies extends PokemonCommon<PokemonSpeciesName> {
  nationalDexNumber: number;
}

export type VersionedPokemonSpecies = Omit<PokemonSpecies, "availableIn">;

export interface Pokemon extends PokemonCommon<PokemonFormName> {
  modes: PokemonMode[];
  evolution: Evolution;
}

export interface VersionedPokemon
  extends Omit<Pokemon, "evolution" | "modes" | "availableIn"> {
  modes: VersionedPokemonMode[];
  evolution: VersionedEvolution;
}

export interface PokemonDefinition {
  species: PokemonSpecies;
  forms: Pokemon[];
}
