import { APIRequestContext, expect, test } from "@playwright/test";

import { LocationOutput } from "@/lib/pokemon/types";

async function getLocation(
  request: APIRequestContext,
  game: string,
  location: string,
): Promise<LocationOutput> {
  const response = await request.get(`/v1/locations/${game}/${location}.json`);

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  return response.json();
}

test("serves the correct JSON data for Viridian Forest in FireRed", async ({
  request,
}) => {
  const body = await getLocation(request, "firered", "viridian-forest");

  expect(body.id).toBe("viridian-forest");
  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "caterpie" }),
    }),
  );
});

test("serves the correct JSON data for Viridian Forest in Blue", async ({
  request,
}) => {
  const body = await getLocation(request, "blue", "viridian-forest");

  expect(body.id).toBe("viridian-forest");
  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "caterpie" }),
    }),
  );
});

test("serves the correct JSON data for Pallet Town in Red", async ({
  request,
}) => {
  const body = await getLocation(request, "red", "pallet-town");

  expect(body.id).toBe("pallet-town");
  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "bulbasaur" }),
    }),
  );

  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "charmander" }),
    }),
  );

  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "squirtle" }),
    }),
  );
});

test("serves the correct JSON data for Route 25 in LeafGreen", async ({
  request,
}) => {
  const body = await getLocation(request, "leafgreen", "route-25");

  expect(body.id).toBe("route-25");
  expect(body.encounters).toContainEqual(
    expect.objectContaining({
      pokemon: expect.objectContaining({ name: "caterpie" }),
    }),
  );
});
