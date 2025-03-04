# Pokémon API Engineering Design Document

## 1. Introduction

This document outlines the design of a Pokémon API that provides data for Pokémon across multiple game versions, including official games and ROM hacks like Radical Red and Unbound. The API needs to efficiently serve both list views and detailed Pokémon data with version-specific variations.

## 2. Problem Statement

I need to create an API that can:

1. Serve data for 1000+ Pokémon across multiple game versions
2. Handle version-specific variations in Pokémon stats, abilities, types, and movesets
3. Support both list queries (by generation, game) and individual Pokémon lookup
4. Perform well in a serverless environment
5. Minimize runtime processing and computational overhead
6. Maintain type safety and data integrity during development
7. Scale efficiently without requiring external database services

The central challenge is managing the complex versioned data structure while providing fast, efficient access patterns for different API use cases.

## 3. Goals & Requirements

### 3.1 Functional Requirements

- Support lookup of individual Pokémon with correct game-specific data
- Support list queries (by generation, game version)
- Maintain complete type safety in source code
- Allow for easy addition of new Pokémon and game versions
- Support versioned properties (stats, types, moves, abilities)
- Support multiple Pokémon modes/forms

### 3.2 Non-Functional Requirements

- Fast response times (<50ms p95)
- Low operational complexity (no database management)
- Serverless compatible
- Low build/deployment complexity
- Cost-effective at scale
- Maintainable data structure for contributors

## 4. Rejected Solutions

### 4.1 Individual JSON Files for Each Pokémon (Not Version-Specific)

**Approach:** Store each Pokémon in a single JSON file with all version data.

**Pros:**
- Simple, well-organized structure
- Easy to update individual Pokémon
- Works with standard file systems

**Cons:**
- Requires runtime processing to extract version-specific data
- Inefficient for list views (1000+ file reads)
- Combines data needed for different use cases

**Rejection Reason:** Poor performance for list operations; requires runtime transformation.

### 4.2 Single JSON File for All Pokémon

**Approach:** Store all Pokémon data in a single large JSON file.

**Pros:**
- Single file read for any query
- No need for directory management
- Simple deployment

**Cons:**
- Large memory footprint (multiple MB in memory)
- Decreased development experience (large file is harder to work with)
- All-or-nothing loading (inefficient for partial data needs)
- Still requires runtime transformations for version-specific data

**Rejection Reason:** Memory inefficiency and poor development experience.

### 4.3 TypeScript Storage Only

**Approach:** Keep all Pokémon data in TypeScript with no JSON.

**Pros:**
- Maximum type safety
- Full programmatic access
- Possible to store non-serializable data

**Cons:**
- Large memory footprint
- Requires complete compilation on changes
- Runtime transformation still needed

**Rejection Reason:** Memory inefficiency and still requires runtime transformations.

### 4.4 Database Storage (Serverless Postgres)

**Approach:** Store Pokémon data in a serverless database like NeonDB.

**Pros:**
- Powerful query capabilities
- Scalable for large datasets
- Standard approach for structured data

**Cons:**
- External dependency adds operational complexity
- Cold start latency in serverless environments
- Higher cost
- Requires database schema design and maintenance

**Rejection Reason:** Unnecessary complexity, cold start issues, higher cost.

### 4.5 In-Memory Caching in Serverless Functions

**Approach:** Implement an in-memory cache in the serverless functions.

**Pros:**
- Could potentially reduce file reads
- Simple to implement

**Cons:**
- Ineffective in serverless environments due to instance lifecycle
- Redundant with CDN caching
- Adds complexity with little benefit
- Cache gets cleared when functions go cold

**Rejection Reason:** Ineffective in serverless environments and redundant with CDN caching.

## 5. Proposed Solution

### 5.1 Overview

Our solution uses a build-time denormalization pattern with hierarchical data organization:

1. Store master Pokémon data as TypeScript files with versioned properties
2. At build time, generate version-specific JSON files for each Pokémon and game
3. Also generate pre-computed list files for common queries (by game, by generation)
4. Serve these static files from CDN/serverless hosting
5. Rely on Vercel's CDN for caching rather than implementing application-level caching

### 5.2 Data Organization

```
/src
  /data
    /master          # TypeScript source of truth
      /generation-1
        1-bulbasaur.ts
        2-ivysaur.ts
        # All Pokémon with full versioned data
/public
  /v1
    /pokemon
      /red-blue      # Version-specific data
        /forms
          bulbasaur.json
          ivysaur.json
        /species
          bulbasaur.json
          ivysaur.json
        /lists
          by-form.json
          by-species.json
      /gold-silver
        /forms
          bulbasaur.json
        /species
          bulbasaur.json
        /lists
          by-form.json
          by-species.json
      /radical-red
        /forms
          bulbasaur.json
        /species
          bulbasaur.json
        /lists
          by-form.json
          by-species.json
    /locations
      /blue
        pallet-town.json
        route-1.json
      /red
        pallet-town.json
        route-1.json
```

### 5.3 Type Definitions

The master data will use TypeScript interfaces that capture versioned properties:

```typescript
interface VersionedProperty<T> {
  default: T;
  versions: {
    appliesTo: PokemonVersionGroups[];
    value: T;
  }[];
}

export interface Pokemon {
  name: string;
  displayName: string;
  availableIn: PokemonVersionGroup[];
  species: PokemonSpecies;
  modes: PokemonMode[];
  evolution: Evolution;
  encounters: VersionedProperty<Encounter[]>;
}
```

### 5.4 Encounter Data

Instead of storing encounter data separately, this should be stored in the Pokémon master data using the `VersionedProperty` API.
Then at the build step, the encounters are extracted and each location in a game is populated with those encounters.

```typescript
export type Evolve = {
  method: EncounterMethod.EVOLVE;
};

export type RedBlueEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: KantoLocation;
  exclusiveTo?: PokemonGame.RED | PokemonGame.BLUE;
};

export type FireRedLeafGreenEncounter = {
  method: Exclude<EncounterMethod, EncounterMethod.EVOLVE>;
  location: KantoLocation;
  exclusiveTo?: PokemonGame.FIRE_RED | PokemonGame.LEAF_GREEN;
};

export type Encounter = Evolve | RedBlueEncounter | FireRedLeafGreenEncounter;
```

### 5.5 Example Master Data

Below is an example Master Data file containing data for Caterpie:

```typescript
const CaterpieSpecies: PokemonSpecies = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  nationalDexNumber: 10,
};

const CaterpieDefaultMode: PokemonMode = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
  isDefault: true,
  types: {
    default: ["Bug"],
    versions: [],
  },
};

const Caterpie: Pokemon = {
  name: "caterpie",
  displayName: "Caterpie",
  availableIn: [...availableStartingRB, PokemonVersionGroup.SWORD_SHIELD],
  isDefault: true,
  modes: [CaterpieDefaultMode],
  evolution: {
    from: "",
    evolutionBranches: {
      default: [
        {
          to: "metapod",
          trigger: EvolutionTrigger.LEVEL_UP,
          conditions: [{ type: "LEVEL", minLevel: 7 }],
        },
      ],
      versions: [],
    },
  },
  encounters: {
    default: [],
    versions: [
      {
        appliesTo: [PokemonVersionGroup.RED_BLUE],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_2,
            exclusiveTo: PokemonGame.BLUE,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_24,
            exclusiveTo: PokemonGame.BLUE,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.VIRIDIAN_FOREST,
          },
        ],
      },
      {
        appliesTo: [PokemonVersionGroup.FIRERED_LEAFGREEN],
        value: [
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_2,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_24,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.ROUTE_25,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.PATTERN_BUSH,
          },
          {
            method: EncounterMethod.TALL_GRASS,
            location: KantoLocation.VIRIDIAN_FOREST,
          },
        ],
      },
    ],
  },
};

const definition: PokemonDefinition = {
  species: CaterpieSpecies,
  forms: [Caterpie],
};

export default definition;
```

### 5.6 Build Pipeline

A build script will:
1. Read all master TypeScript files
2. For each Pokémon and game version, extract the appropriate data
3. Write version-specific JSON files for individual Pokémon
4. Generate pre-computed list files:
    - By game version (red-blue.json, gold-silver.json, etc.)
    - By generation (gen-1.json, gen-2.json, etc.)
5. Write game-specific JSON files for each Location containing the encounters

## 6. System Architecture

### 6.1 Component Diagram

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│                 │     │              │     │                 │
│   Master Data   │────▶│  Build Step  │────▶│  Generated JSON │
│   (TypeScript)  │     │              │     │  (Static Files) │
│                 │     │              │     │                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                      │
                                                      ▼
┌─────────────────┐                          ┌─────────────────┐
│                 │                          │                 │
│   API Client    │◀────────────────────────▶│  CDN / Static   │
│                 │                          │  File Hosting   │
│                 │                          │                 │
└─────────────────┘                          └─────────────────┘
```

## 7. Implementation Details

### 7.1 Build Script
A TypeScript build script in `/scripts/build.ts` will be ran using the NPM command `npm run build:deploy`. The build
script will call functions in `/src/lib/pokemon` such as `buildPokemonApi()` and `buildLocationApi()` to generate
the JSON files.

### 7.2 Data Access Layer

Just access the JSON files! They're stored in the Next.js `/public` directory, which means the end user can simply
access them like any other file.

### 7.3 API Endpoints

The build script generates JSON and places them in `/public` in the following structure:
- `/v1/pokemon/[version-group]/forms/[pokemon].json` - Use this to access a Pokémon
- `/v1/pokemon/[version-group]/species/[pokemon].json` - Use this to access a Pokémon Species
- `/v1/pokemon/[version-group]/lists/by-form.json` - Use this to access a list of Pokémon available in this version group
- `/v1/pokemon/[version-group]/lists/by-species.json` - Use this to access a list of Pokémon Species available in this version group
- `/v1/locations/[game]/[location].json` - Lists all Pokémon that can be found at this location

### 7.4 Caching Strategy

- CDN caching for static files (using proper Cache-Control headers)
- No application-level caching (relying on Vercel's CDN)
- Cache headers set to:
    - `s-maxage=604800` (CDN caches for 1 week)
    - `max-age=86400` (Browsers cache for 1 day)

### 7.5 Security

The complexity of this app is entirely at the build step and as of now there is zero runtime. All the data is served
via a CDN and is static and immutable. The app has no user input and requires no authentication to access the data.
Deployment is handled by Vercel, which is secured behind GitHub OAuth and MFA. All of these factors means there are 
essentially no attack vectors.

#### Future Considerations

It's possible that I'll decide to add a GraphQL API in the future. In this case, security features such as rate-limiting
will be evaluated but will likely prove unnecessary due to how lightweight the API is.

### 7.6 Operational Longevity & Versioning

Any breaking changes will be introduced via additional API versions (e.g. `/api/v2`) as is industry standard. As for
the introduction of additional data, rebuilding the JSON files will never take more than 30 minutes and should only
be necessary when new Pokémon games come out around once a year, or I decide to support an additional ROM Hack.

## 8. Performance Considerations

### 8.1 File Size Analysis

- Average single Pokémon JSON: <1kb
- List JSON files: ~50-100KB
- Total storage for 1000 Pokémon × 18 game versions: ~25MB

### 8.2 Expected Performance

- Cold start (first request, no CDN): ~100-200ms
- Warm CDN hit: ~20-50ms
- List view with CDN hit: ~30-60ms

### 8.3 Scaling Properties

- Horizontal scaling through CDN/serverless
- Load independent of dataset size due to pre-computation
- New game versions add linearly to build time but don't affect runtime

## 9. Deployment & Testing

### 9.1 Deployment Process

1. Build step runs during CI/CD pipeline
2. Generated files are deployed to Vercel
3. Serverless functions are deployed with the static files

### 9.2 Testing Strategy

- Unit tests for build scripts and version transformation logic
- Snapshot tests for generated JSON structure
- Integration tests for API endpoints
- Performance tests for response time benchmarks

## 10. UI Layer

### 10.1 Next.js Integration

The API will be complemented by a Next.js UI layer:

- `/` - Home page with information about the API
- `/pokemon` - Master list of all Pokémon
- `/pokemon/[id]` - The most up-to-date individual Pokémon data
- `/games/[game]/pokemon` - Game Pokedex page
- `/games/[game]/pokemon/[id]` - Individual Pokémon page with data from that game
- `/games/[game]/locations` - Lists locations within a game
- `/games/[game]/locations/[id]` - Lists Pokémon that can be found at this location
- `/api-docs` - Interactive API documentation

### 10.2 Project Structure

```
pokemon-api/
├── src/
│   ├── app/                       # Next.js App Router (UI routes)
│   │   └── api/                   # API routes (endpoints)
│   ├── components/                # Shared UI components
│   ├── data/                      # Source data (TypeScript)
│   ├── lib/                       # Shared utilities
│   └── scripts/                   # Build scripts
├── public/
│   ├── v1/                        # Generated JSON data
│   └── images/                    # Static images
```

## 11. Future Work

### 11.1 Potential Enhancements

- **Support for Pokémon learnsets with version-specific data**
- Additional list types (by type, by ability) if demand exists
- GraphQL API layer for more flexible queries
- Advanced search capabilities
- Partial updates for efficient data changes

### 11.2 Monitoring & Observability

- Track API usage patterns to optimize pre-computed lists
- Monitor file sizes and build times
- Track CDN hit rates

## 12. Conclusion

The proposed denormalized, build-time approach provides an optimal balance of:

- Development experience (TypeScript source of truth)
- Runtime performance (pre-computed JSON with no transformations)
- Operational simplicity (static files, CDN caching)
- Scalability (Vercel-friendly, serverless compatible)

It pushes complexity to build time rather than runtime, resulting in a system that's both maintainable and high-performance, with minimal operational overhead.