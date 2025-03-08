import { APIRequestContext, expect, test } from "@playwright/test";

import { PokemonOutput } from "@/lib/pokemon/types";

async function getPokemon(
  request: APIRequestContext,
  version: string,
  name: string,
): Promise<PokemonOutput> {
  const response = await request.get(
    `/v1/pokemon/${version}/forms/${name}.json`,
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  return response.json();
}

test("serves the correct JSON data for Charizard in ORAS", async ({
  request,
}) => {
  const body = await getPokemon(
    request,
    "omega-ruby-alpha-sapphire",
    "charizard",
  );

  expect(body).toEqual(expect.objectContaining({ name: "charizard" }));

  expect(body.species).toEqual(
    expect.objectContaining({ name: "charizard", nationalDexNumber: 6 }),
  );

  expect(body.modes.length).toBe(3); // Normal, Mega-X, Mega-Y

  expect(body.modes).toContainEqual(
    expect.objectContaining({ name: "charizard" }),
  );

  expect(body.modes).toContainEqual(
    expect.objectContaining({ name: "charizard-mega-x" }),
  );

  expect(body.modes).toContainEqual(
    expect.objectContaining({ name: "charizard-mega-y" }),
  );

  expect(body.encounters.length).toBeGreaterThan(0);
  expect(body.evolution.from).toBe("charmeleon");
});

test("serves the correct JSON data for Charizard in USUM", async ({
  request,
}) => {
  const body = await getPokemon(request, "ultra-sun-ultra-moon", "charizard");

  expect(body).toEqual(expect.objectContaining({ name: "charizard" }));

  expect(body.species).toEqual(
    expect.objectContaining({ name: "charizard", nationalDexNumber: 6 }),
  );

  expect(body.modes.length).toBe(1); // USUM doesn't have Mega Evolution

  expect(body.modes).toContainEqual(
    expect.objectContaining({ name: "charizard" }),
  );

  expect(body.encounters.length).toBeGreaterThan(0);
  expect(body.evolution.from).toBe("charmeleon");
});

test("serves the correct JSON data for Caterpie in FRLG", async ({
  request,
}) => {
  const body = await getPokemon(request, "firered-leafgreen", "caterpie");

  expect(body).toEqual(expect.objectContaining({ name: "caterpie" }));

  expect(body.species).toEqual(
    expect.objectContaining({ name: "caterpie", nationalDexNumber: 10 }),
  );

  expect(body.modes.length).toBe(1);

  expect(body.modes).toContainEqual(
    expect.objectContaining({ name: "caterpie" }),
  );

  expect(body.encounters.length).toBeGreaterThan(0);
  expect(body.evolution.from).toBe("");
  expect(body.evolution.evolutionBranches.length).toBe(1);
});
