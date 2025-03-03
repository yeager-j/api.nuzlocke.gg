# Pokemon API Engineering Design Document

## 1. Introduction

This document outlines the design of a Pokemon API that provides data for Pokemon across multiple game versions, including official games and ROM hacks like Radical Red and Unbound. The API needs to efficiently serve both list views and detailed Pokemon data with version-specific variations.

## 2. Problem Statement

We need to create an API that can:

1. Serve data for 1000+ Pokemon across multiple game versions
2. Handle version-specific variations in Pokemon stats, abilities, types, and movesets
3. Support both list queries (by generation, game) and individual Pokemon lookup
4. Perform well in a serverless environment
5. Minimize runtime processing and computational overhead
6. Maintain type safety and data integrity during development
7. Scale efficiently without requiring external database services

The central challenge is managing the complex versioned data structure while providing fast, efficient access patterns for different API use cases.

## 3. Goals & Requirements

### 3.1 Functional Requirements

- Support lookup of individual Pokemon with correct game-specific data
- Support list queries (by generation, game version)
- Maintain complete type safety in source code
- Allow for easy addition of new Pokemon and game versions
- Support versioned properties (stats, types, moves, abilities)
- Support multiple Pokemon modes/forms

### 3.2 Non-Functional Requirements

- Fast response times (<50ms p95)
- Low operational complexity (no database management)
- Serverless compatible
- Low build/deployment complexity
- Cost-effective at scale
- Maintainable data structure for contributors

## 4. Rejected Solutions

### 4.1 Individual JSON Files for Each Pokemon (Not Version-Specific)

**Approach:** Store each Pokemon in a single JSON file with all version data.

**Pros:**
- Simple, well-organized structure
- Easy to update individual Pokemon
- Works with standard file systems

**Cons:**
- Requires runtime processing to extract version-specific data
- Inefficient for list views (1000+ file reads)
- Combines data needed for different use cases

**Rejection Reason:** Poor performance for list operations; requires runtime transformation.

### 4.2 Single JSON File for All Pokemon

**Approach:** Store all Pokemon data in a single large JSON file.

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

**Approach:** Keep all Pokemon data in TypeScript with no JSON.

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

**Approach:** Store Pokemon data in a serverless database like NeonDB.

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

1. Store master Pokemon data as TypeScript files with versioned properties
2. At build time, generate version-specific JSON files for each Pokemon and game
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
        # All Pokemon with full versioned data
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
}
```

### 5.4 Build Pipeline

A build script will:
1. Read all master TypeScript files
2. For each Pokemon and game version, extract the appropriate data
3. Write version-specific JSON files for individual Pokemon
4. Generate pre-computed list files:
    - By game version (red-blue.json, gold-silver.json, etc.)
    - By generation (gen-1.json, gen-2.json, etc.)

## 6. System Architecture

### 6.1 Component Diagram

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│                 │     │              │     │                 │
│  Source Files   │────▶│  Build Step  │────▶│  Generated JSON │
│  (TypeScript)   │     │              │     │  (Static Files) │
│                 │     │              │     │                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                      │
                                                      ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│                 │     │              │     │                 │
│   API Client    │◀───▶│   API Layer  │◀───▶│  CDN / Static   │
│                 │     │ (Serverless) │     │  File Hosting   │
│                 │     │              │     │                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
```

### 6.2 Request Flow

1. Client requests `/api/games/radical-red/pokemon/bulbasaur`
2. Request is routed to API function
3. If the CDN has a cached response, it returns it immediately
4. Otherwise, the API function reads `/public/v1/pokemon/radical-red/bulbasaur.json`
5. JSON is returned to client (cached in CDN for future requests)

## 7. Implementation Details

### 7.1 Build Script

The build process will:

```typescript
async function buildAll() {
  // 1. Load all master Pokemon data
  const masterPokemon = await loadMasterData();
  
  // 2. Generate version-specific files
  for (const pokemon of masterPokemon) {
    for (const gameVersion of allGameVersions) {
      const versionSpecific = transformToGameVersion(pokemon, gameVersion);
      await writeVersionSpecificFile(versionSpecific, gameVersion);
    }
  }
  
  // 3. Generate list files
  
  // By game version
  for (const gameVersion of allGameVersions) {
    await generateGameList(gameVersion);
  }
  
  // By generation
  const generations = {
    1: { min: 1, max: 151, games: ["RED_BLUE", "YELLOW"] },
    2: { min: 152, max: 251, games: ["GOLD_SILVER", "CRYSTAL"] },
    // etc...
  };
  
  for (const [gen, range] of Object.entries(generations)) {
    await generateGenerationList(gen, range);
  }
}
```

### 7.2 Data Access Layer

Just access the JSON files! They're stored in the Next.js `/public` directory, which means the end user can simply
access them like any other file.

### 7.3 API Endpoints

The build script generates JSON and places them in `/public` in the following structure:
- `/v1/pokemon/[version-group]/forms/[pokemon].json` - Use this to access a Pokemon
- `/v1/pokemon/[version-group]/species/[pokemon].json` - Use this to access a Pokemon Species
- `/v1/pokemon/[version-group]/lists/by-form.json` - Use this to access a list of Pokemon available in this version group
- `/v1/pokemon/[version-group]/lists/by-species.json` - Use this to access a list of Pokemon Species available in this version group

### 7.4 Caching Strategy

- CDN caching for static files (using proper Cache-Control headers)
- No application-level caching (relying on Vercel's CDN)
- Cache headers set to:
    - `s-maxage=604800` (CDN caches for 1 week)
    - `max-age=86400` (Browsers cache for 1 day)

## 8. Performance Considerations

### 8.1 File Size Analysis

- Average single Pokemon JSON: <1kb
- List JSON files: ~50-100KB
- Total storage for 1000 Pokemon × 18 game versions: ~25MB

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
- `/pokemon` - Master list of all Pokemon
- `/pokemon/[id]` - The most up-to-date individual Pokemon data
- `/games/[game]` - Game Pokedex page
- `/games/[game]/pokemon/[id]` - Individual Pokemon page with data from that game
- `/generation/[gen]` - Generation list page
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
│   ├── data/                      # Generated JSON data
│   └── images/                    # Static images
```

## 11. Future Work

### 11.1 Potential Enhancements

- **Support for Pokemon learnsets with version-specific data**
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