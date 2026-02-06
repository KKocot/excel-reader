# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aplikacja do sortowania spotkań SuperW - narzędzie do czytania plików CSV wyeksportowanych z systemu Kwap1/Wiosny, analizy statusu Kart Sukcesów i generowania raportów Excel. Aplikacja działa lokalnie w przeglądarce (offline-capable).

## Commands

```bash
npm run dev              # Start Vite dev server (localhost:5173)
npm run build            # TypeScript compile + Vite build
npm run preview          # Preview production build (localhost:4173)
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run type-check       # TypeScript type checking only

# Unit Testing (Vitest)
npm run test             # Run unit tests in watch mode
npm run test:ui          # Vitest UI mode (interactive)
npm run test:coverage    # Generate coverage report (v8)

# E2E Testing (Playwright)
npm run test:e2e         # Run all E2E tests (requires build first)
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:headed  # Run tests in headed browser
npm run test:e2e:debug   # Debug mode with inspector

# CI pipelines
npm run ci               # type-check + build
npm run ci:strict        # lint + type-check + build
npm run ci:full          # lint + type-check + build + unit tests + e2e tests
```

**Test Coverage**: See `TESTING.md` for detailed testing documentation. Core business logic (raport-genarator, utils, hooks) has 97-100% coverage.

## Tech Stack

- React 19, Vite 7.3, TypeScript 5.9
- Tailwind CSS 4 (@tailwindcss/vite), Radix UI (accordion, label, slot, icons)
- react-router-dom 7.6 (file-based routing)
- PapaParse (CSV parsing), xlsx-js-style (Excel export with styling)
- date-fns 4.1 (week calculations)
- Vitest 4.0 (unit testing), @testing-library/react 16.3 (component testing)
- Playwright 1.58 (E2E testing)

**IMPORTANT**: Tailwind CSS 4 breaking changes:
- Uses `@import "tailwindcss"` instead of `@tailwind` directives in CSS
- CSS variables defined in `@theme {}` blocks instead of `:root`
- Color naming: `--color-*` prefix (e.g., `--color-primary`, `--color-background`)
- Uses OKLCH color space instead of HSL
- No PostCSS config needed - uses `@tailwindcss/vite` plugin directly
- Config in `tailwind.config.js` still used for `extend` (animations, custom utilities)

## Architecture

### Data Flow

1. User uploads CSV files via two methods:
   - **Option A**: Upload from Home page → redirect to `/classes` with files in location.state
   - **Option B**: Upload directly on `/classes` page via input field
2. PapaParse parses CSV -> `ClassesGroupProps[][]`
3. `raportGenarator()` transforms raw data:
   - Groups by school (title extraction)
   - Pairs students with weekly class status
   - Calculates color status (green/yellow/red) based on meeting status
4. UI displays grouped data with color-coded status filtering
5. User can export to styled Excel via xlsx-js-style

### Key Files

**Core Logic:**
- `src/types/index.ts` - Central type definitions (ClassStatus, StatusColor, Item, WeekItem, Sort, etc.)
- `src/lib/raport-genarator.ts` - Core business logic: CSV parsing, status color mapping, week calculations
- `src/lib/utils.ts` - `cn()` utility, `getSchool()` data extraction, `createDate()` week-to-date conversion

**Pages & Components:**
- `src/pages/Home.tsx` - Landing page with file upload button and sample downloads (with confirmation dialog)
- `src/pages/Classes.tsx` - Main container: state management, CSV upload handler, location.state integration
- `src/hooks/use_classes_filter.ts` - Custom hook: filtering state (red/green/yellow toggles, show dates)
- `src/components/classes/ClassesUpload.tsx` - File upload UI + current week display
- `src/components/classes/ClassesFilters.tsx` - Color filter buttons + show dates toggle
- `src/components/classes/ClassesList.tsx` - Accordion display of processed data
- `src/components/classes-group.tsx` - School group display with pairs
- `src/components/download-classes-raport.tsx` - Excel export with styled cells

### Status Color System

```
green:  spotkanie_do_akceptacji, spotkanie_zaakceptowane, wydarzenie_*, odrabianie_zajec_*
yellow: odwolal_wolontariusz, odwolalo_dziecko
red:    brak_zajec (or default/unknown)
```

### Routes

- `/` - Home page with:
  - App description
  - Sample CSV file downloads (with confirmation dialog)
  - Direct file upload (redirects to /classes with files)
- `/classes` - Main functionality:
  - CSV upload input
  - Accepts files from Home page via location.state
  - Filtering UI (red/green/yellow status)
  - Report generation and Excel export
- `*` - 404 Not Found

### Sample Data

Test CSV files available in `public/sample/` (3_KS_w_szkolach1-4.csv)
