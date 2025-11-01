# Excel Reader

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
