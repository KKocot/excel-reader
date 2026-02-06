/**
 * Vitest setup file
 * Configures testing environment for React components
 */

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});
