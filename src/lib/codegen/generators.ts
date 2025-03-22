import { EvolutionBranch } from "@/data/evolution/types";
import {
  Pokemon,
  PokemonDefinition,
  PokemonMode,
  PokemonSpecies,
} from "@/data/pokemon/types";
import { VersionedProperty } from "@/data/types";
import {
  evolutionTriggerEnumHelper,
  generateAvailableInString,
  toPascalCase,
  versionGroupEnumHelper,
} from "@/lib/codegen/utils";

function speciesName(species: PokemonSpecies): string {
  return `${toPascalCase(species.name)}Species`;
}

function modeName(mode: PokemonMode): string {
  return `${toPascalCase(mode.name)}${mode.isDefault && "Default"}Mode`;
}

function formName(form: Pokemon): string {
  return toPascalCase(form.name);
}

/**
 * Constructs a string representation of a Pokemon species object in a specific format. Used for code generation.
 *
 * @param {PokemonSpecies} species - The species object containing details about a Pokemon.
 * @return {string} The formatted string representation of the Pokemon species object.
 */
export function generateSpecies(species: PokemonSpecies): string {
  return `const ${speciesName(species)}: PokemonSpecies = {
  name: "${species.name}",
  displayName: "${species.displayName}",
  availableIn: ${generateAvailableInString(species.availableIn)},
  nationalDexNumber: ${species.nationalDexNumber},
};`;
}

/**
 * Constructs a string representation of a Pokemon mode object using the provided mode details. Used for code generation.
 *
 * @param {PokemonMode} mode - An object containing the properties of the Pokemon mode.
 * @return {string} - A string representation of the constructed Pokemon mode object in a TypeScript format.
 */
export function generateMode(mode: PokemonMode): string {
  return `const ${modeName(mode)}: PokemonMode = {
  name: "${mode.name}",
  displayName: "${mode.displayName}",
  availableIn: ${generateAvailableInString(mode.availableIn)},
  isDefault: ${mode.isDefault},
  sprite: "${mode.sprite}",
  types: ${JSON.stringify(mode.types)},
};`;
}

/**
 * Constructs a string representation of an evolution branch object. Used for code generation.
 *
 * @param {EvolutionBranch} branch - The evolution branch object containing details such as target evolution, trigger, and conditions.
 * @return {string} A string representation of the evolution branch, including its target evolution, trigger information, and conditions.
 */
export function generateEvolutionBranch(branch: EvolutionBranch): string {
  return `{
  to: "${branch.to}",
  trigger: ${evolutionTriggerEnumHelper(branch.trigger)},
  conditions: ${JSON.stringify(branch.conditions)},
}`;
}

/**
 * Constructs a string representation of evolution branches with their default and versioned values.
 *
 * @param {VersionedProperty<EvolutionBranch[]>} evolutionBranches - The versioned property containing evolution branches with default and versioned values.
 * @return {string} A formatted string representing the evolution branches with their defaults and specific version configurations.
 */
export function generateEvolutionBranches(
  evolutionBranches: VersionedProperty<EvolutionBranch[]>,
): string {
  return `{
  default: [${evolutionBranches.default.map(generateEvolutionBranch).join(",\n")}],
  versions: [${evolutionBranches.versions.map(
    (version) => `{
      appliesTo: [${version.appliesTo.map(versionGroupEnumHelper).join(", ")}],
      value: [${version.value.map(generateEvolutionBranch).join(",\n")}],
    }`,
  )}]
}`;
}

/**
 * Constructs a string representation of a Pokemon form object based on the provided input. Used for code generation.
 *
 * @param {Pokemon} form - The Pokemon form object to construct the string representation for.
 * @return {string} A string representation of the Pokemon form object
 */
export function generateForm(form: Pokemon): string {
  return `const ${formName(form)}: Pokemon = {
  name: "${form.name}",
  displayName: "${form.displayName}",
  availableIn: ${generateAvailableInString(form.availableIn)},
  isDefault: ${form.isDefault},
  modes: [${form.modes.map(modeName).join(", ")}],
  evolution: {
    from: "${form.evolution.from}",
    evolutionBranches: ${generateEvolutionBranches(form.evolution.evolutionBranches)},
  },
};`;
}

export function generateDefinition(
  species: PokemonSpecies,
  forms: Pokemon[],
): string {
  return `const definition: PokemonDefinition = {
  species: ${speciesName(species)},
  forms: [${forms.map(formName).join(", ")}],
};

export default definition;`;
}

export function generatePokemonDefinitionFile(definition: PokemonDefinition) {
  const speciesCodegen = generateSpecies(definition.species);
  const modesCodegen = definition.forms
    .flatMap((f) => f.modes)
    .map(generateMode);
  const formsCodegen = definition.forms.map(generateForm);

  const definitionCodegen = generateDefinition(
    definition.species,
    definition.forms,
  );

  return `${speciesCodegen}\n\n${modesCodegen.join("\n\n")}\n\n${formsCodegen.join("\n\n")}\n\n${definitionCodegen}`;
}

/**
 * Constructs a JSDoc-style comment block for the given input comment string.
 * The comment is formatted to ensure each line does not exceed the specified maximum width.
 *
 * @param {string} comment The comment text to be formatted into a JSDoc block.
 * @param {number} [maxWidth=120] The desired maximum width for each line in the formatted JSDoc comment block, including reserved characters for formatting. Default is 120.
 * @return {string} A formatted JSDoc comment block containing the input comment text.
 */
export function generateComment(
  comment: string,
  maxWidth: number = 120,
): string {
  // Reserve 3 characters for ' * ' at the beginning of each line
  const contentWidth = maxWidth - 3;

  // Split the comment into words
  const words = comment.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  // Build lines within max width
  words.forEach((word) => {
    // Check if adding this word would exceed the line width
    if (
      currentLine.length + word.length + 1 > contentWidth &&
      currentLine.length > 0
    ) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
    }
  });

  // Add the last line if it has content
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  // Format into JSDoc comment
  return `/**\n${lines.map((line) => ` * ${line}`).join("\n")}\n */`;
}
