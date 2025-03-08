import { expect, test } from "@playwright/test";

test("serves the correct JSON data for Charizard in ORAS", async ({
  request,
}) => {
  const response = await request.get(
    "/v1/pokemon/omega-ruby-alpha-sapphire/forms/charizard.json",
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});

test("serves the correct JSON data for Charizard in USUM", async ({
  request,
}) => {
  const response = await request.get(
    "/v1/pokemon/ultra-sun-ultra-moon/forms/charizard.json",
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});

test("serves the correct JSON data for Caterpie in FRLG", async ({
  request,
}) => {
  const response = await request.get(
    "/v1/pokemon/firered-leafgreen/forms/caterpie.json",
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();
  expect(JSON.stringify(body)).toMatchSnapshot();
});
