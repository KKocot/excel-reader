# Excel Reader

A web application for analyzing CSV files exported from SuperW system (Kwap1/Wiosny). The tool processes class meeting data, analyzes Success Card statuses, and generates styled Excel reports.

## Features

- CSV file upload and parsing (PapaParse)
- Meeting status color coding (green/yellow/red)
- Week-based filtering with calendar picker
- Grouped display by school (Radix UI accordion)
- Excel export with styled cells (xlsx-js-style)
- Offline-capable (runs in browser)

## Tech Stack

- React 19, Vite 7.3, TypeScript 5.9
- Tailwind CSS 4 (OKLCH color space)
- Radix UI (accordion, label, slot, icons)
- react-router-dom 7.6
- PapaParse (CSV parsing)
- xlsx-js-style (Excel export)
- date-fns 4.1 (week calculations)
- Vitest 4.0 + Playwright 1.58 (testing)

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
```

## How it works

1. Upload CSV files from Home page or directly on /classes page
2. PapaParse parses CSV into ClassesGroupProps arrays
3. raport-genarator transforms data (groups by school, pairs students with weekly status)
4. Color status calculated based on meeting status (green/yellow/red)
5. Export to styled Excel via xlsx-js-style

## Project structure

- `src/lib/raport-genarator.ts` - Core business logic
- `src/hooks/use_classes_filter.ts` - Filtering state
- `src/components/classes/` - Main components
- `public/sample/` - Example CSV files

## License

MIT
