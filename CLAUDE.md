# CLAUDE.md - Coding Assistant Guide

## Commands
- Build: `npm run build` or `pnpm build`
- Dev: `npm run dev` or `pnpm dev --turbopack`
- Lint: `npm run lint` or `pnpm lint`
- Start: `npm run start` or `pnpm start`
- Test: Look for test commands as they're added

## Code Style
- TypeScript with strict typing
- Next.js and React 19 patterns
- Double quotes, semicolons required
- Prettier formatting with @ianvs/prettier-plugin-sort-imports
- ESLint with Next.js core web vitals
- Follow existing patterns in `/src/data` for Pokemon/moves data structure
- Type-safe schemas for all data models
- Use existing utility functions in `/src/lib/utils.ts`
- Versioned data pattern as outlined in ENGINEERING.md

## Architecture
- File-based API design using pre-generated JSON
- Multi-version data storage (see `/src/data/versions.ts`)
- Leverage TypeScript typing for data consistency