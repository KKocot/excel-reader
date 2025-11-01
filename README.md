# Excel Reader

[![CI/CD Pipeline](https://github.com/KKocot/excel-reader/actions/workflows/ci.yml/badge.svg)](https://github.com/KKocot/excel-reader/actions/workflows/ci.yml)

A web application for reading, analyzing, and generating reports from CSV files, built with React, TypeScript, and Tailwind CSS.

## Features

- Upload and preview CSV files
- Group and display class data
- Generate downloadable reports
- Error handling and user-friendly UI

## Project Structure

- `src/` – Main source code
  - `components/` – UI and feature components
  - `lib/` – Utility and report generation logic
  - `pages/` – App pages (Home, Classes, etc.)
- `public/sample/` – Example CSV files for testing

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Development Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run TypeScript type checking
npm run type-check

# Run full CI pipeline (lint + type-check + build)
npm run ci

# Preview production build
npm run preview
```

## CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

- **Continuous Integration**: Runs on every push and pull request
  - Tests with Node.js 18.x and 20.x
  - ESLint code quality checks
  - TypeScript type checking
  - Production build validation
- **Continuous Deployment**: Deploys to Vercel on main branch pushes

### Setting up Deployment

To enable Vercel deployment, add these secrets to your GitHub repository:

- `VERCEL_TOKEN` - Your Vercel deployment token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

## Usage

1. Upload a CSV file from the sample files or your own.
2. View and interact with the parsed data.
3. Download generated reports as needed.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS

## Folder Overview

- `components.json`, `tailwind.config.js`, `vite.config.ts` – Configuration files
- `public/sample/` – Sample CSVs for demo/testing

## License

MIT
