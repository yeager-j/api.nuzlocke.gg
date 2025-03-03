import { buildLocationApi } from "@/lib/pokemon/build-location-api";
import { buildPokemonApi } from "@/lib/pokemon/build-pokemon-api";

async function main() {
  await buildPokemonApi();
  await buildLocationApi();
}

main();
