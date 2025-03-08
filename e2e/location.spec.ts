import { expect, test } from "@playwright/test";

test("serves the correct JSON data for Viridian Forest in FireRed", async ({
  request,
}) => {
  const response = await request.get(
    "/v1/locations/firered/viridian-forest.json",
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});

test("serves the correct JSON data for Viridian Forest in Blue", async ({
  request,
}) => {
  const response = await request.get("/v1/locations/blue/viridian-forest.json");

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});

test("serves the correct JSON data for Pallet Town in Red", async ({
  request,
}) => {
  const response = await request.get("/v1/locations/red/viridian-forest.json");

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});

test("serves the correct JSON data for Route 25 in LeafGreen", async ({
  request,
}) => {
  const response = await request.get("/v1/locations/red/viridian-forest.json");

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});
