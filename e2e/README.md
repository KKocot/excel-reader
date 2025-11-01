# E2E Tests

This directory contains end-to-end (E2E) tests for the Excel Reader application using Playwright.

## Test Structure

- **`home.spec.ts`** - Tests for the home page functionality, navigation, and basic content
- **`classes.spec.ts`** - Tests for the classes/meetings page, file upload, and filtering features
- **`navigation.spec.ts`** - Tests for routing, navigation between pages, and URL handling
- **`ui-interactions.spec.ts`** - Tests for UI component interactions, buttons, forms, and responsive design
- **`error-handling.spec.ts`** - Tests for error states, graceful degradation, and resilience

## Running Tests

### All Tests

```bash
npm run test:e2e
```

### With UI (Interactive mode)

```bash
npm run test:e2e:ui
```

### Headed mode (Visible browser)

```bash
npm run test:e2e:headed
```

### Debug mode

```bash
npm run test:e2e:debug
```

### Specific test file

```bash
npx playwright test home.spec.ts
```

### Specific test by name

```bash
npx playwright test --grep "should load the home page"
```

## Test Coverage

The tests cover:

- ✅ Home page loading and content
- ✅ Navigation between pages
- ✅ Classes page functionality
- ✅ File upload interface
- ✅ Filter/sorting controls (color buttons)
- ✅ Button interactions and hover states
- ✅ Keyboard navigation and accessibility
- ✅ Responsive design across viewports
- ✅ Error handling and graceful degradation
- ✅ External link behavior
- ✅ Browser back/forward navigation
- ✅ Route handling (valid and invalid routes)

## CI Integration

Tests are automatically run in the CI/CD pipeline on:

- Push to main/develop branches
- Pull requests to main
- Multiple browsers (Chromium, Firefox, WebKit)
- Node.js version 20.x

## Configuration

Test configuration is in `playwright.config.ts`:

- Tests run against `http://localhost:4173` (preview server)
- Automatic browser installation
- HTML reports generated
- Traces collected on retry
- Parallel execution for faster runs

## Writing New Tests

When adding new tests:

1. Follow the existing naming convention
2. Use descriptive test names
3. Group related tests in `describe` blocks
4. Use proper selectors (prefer data-testid or semantic selectors)
5. Include both positive and negative test cases
6. Test across different browsers when behavior might vary
