# CLAUDE.md - Coding Assistant Guide

## Commands
- Build: `pnpm build` or `pnpm build:deploy` (builds and generates data)
- Dev: `pnpm dev --turbopack`
- Lint: `pnpm lint`
- Test (all): `pnpm test`
- Test (unit): `pnpm test:unit` (run a single test with `pnpm test:unit path/to/test.ts`)
- Test (e2e): `pnpm test:e2e`
- Test (benchmark): `pnpm test:benchmark`
- Test (update snapshots): `pnpm test:update`
- Generate Data: `pnpm generate-data`

## Code Style
- TypeScript with strict typing and explicit return types
- Next.js and React 19 patterns with App Router
- Double quotes, semicolons required
- Prettier formatting with @ianvs/prettier-plugin-sort-imports
- Follow existing patterns in `/src/data` for Pokemon/moves/locations data structure
- Type-safe schemas for all data models using TypeScript interfaces
- Use existing utility functions in `/src/lib/utils.ts` and `/src/lib/pokemon/utils.ts`
- Versioned data pattern with `VersionedProperty<T>` interface (see ENGINEERING.md)
- Error handling through type validation at build time, not runtime exceptions

## Architecture
- Build-time denormalization pattern (TypeScript → JSON)
- File-based API design using pre-generated JSON
- Multi-version data storage (see `/src/data/versions.ts`)
- No runtime processing - all data computation happens at build time
- Hierarchical data organization by game version and Pokemon