import { PokemonVersionGroup } from "@/data/versions";

export function toPascalCase(str: string) {
  const regexp = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );

  return (regexp ?? [])
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join("");
}

export function arraysEqual(
  a: PokemonVersionGroup[],
  b: PokemonVersionGroup[],
): boolean {
  if (a.length !== b.length) return false;
  return (
    a.every((item) => b.includes(item)) && b.every((item) => a.includes(item))
  );
}

export function isSubset(
  subset: PokemonVersionGroup[],
  superset: PokemonVersionGroup[],
): boolean {
  return subset.every((item) => superset.includes(item));
}
