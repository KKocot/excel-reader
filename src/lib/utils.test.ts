import { describe, it, expect } from "vitest";
import { cn, getSchool, createDate } from "./utils";
import { ClassesGroupProps } from "@/types";

/**
 * Unit tests for utility functions
 * Tests class name merging, school extraction, and date creation
 */

describe("utils", () => {
  describe("cn", () => {
    it("should merge single class name", () => {
      const result = cn("text-red-500");
      expect(result).toBe("text-red-500");
    });

    it("should merge multiple class names", () => {
      const result = cn("text-red-500", "bg-blue-200");
      expect(result).toContain("text-red-500");
      expect(result).toContain("bg-blue-200");
    });

    it("should handle conditional classes with clsx", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toContain("base-class");
      expect(result).toContain("active-class");
    });

    it("should handle false/null/undefined values", () => {
      const result = cn("base", false, null, undefined, "valid");
      expect(result).toContain("base");
      expect(result).toContain("valid");
    });

    it("should merge conflicting tailwind classes correctly", () => {
      const result = cn("text-red-500", "text-blue-500");
      // tailwind-merge should keep only last class
      expect(result).toBe("text-blue-500");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle array of classes", () => {
      const result = cn(["text-red-500", "bg-blue-200"]);
      expect(result).toContain("text-red-500");
      expect(result).toContain("bg-blue-200");
    });

    it("should handle objects with boolean values", () => {
      const result = cn({
        "text-red-500": true,
        "bg-blue-200": false,
        "p-4": true,
      });
      expect(result).toContain("text-red-500");
      expect(result).not.toContain("bg-blue-200");
      expect(result).toContain("p-4");
    });
  });

  describe("getSchool", () => {
    it("should return array of school data arrays", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "School 1 / Szkoła Podstawowa\rExtra data",
            __parsed_extra: [],
          },
        ],
        [
          {
            Textbox5: "School 2 / Szkoła Podstawowa\rExtra data",
            __parsed_extra: [],
          },
        ],
      ];

      const result = getSchool(mockData);
      expect(result).toHaveLength(2);
      expect(Array.isArray(result[0])).toBe(true);
      expect(result[0][0].Textbox5).toContain("School 1");
    });

    it("should filter out items with empty Textbox5 after split", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "School 1 / Szkoła Podstawowa",
            __parsed_extra: [],
          },
        ],
        [
          {
            Textbox5: "\r",
            __parsed_extra: [],
          },
        ],
      ];

      const result = getSchool(mockData);
      expect(result).toHaveLength(1);
      expect(result[0][0].Textbox5).toContain("School 1");
    });

    it("should return empty array for empty input", () => {
      const result = getSchool([]);
      expect(result).toEqual([]);
    });

    it("should handle single school", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
        ],
      ];

      const result = getSchool(mockData);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockData[0]);
    });
  });

  describe("createDate", () => {
    it("should return object with start and end dates", () => {
      const result = createDate(1);
      expect(result).toHaveProperty("start");
      expect(result).toHaveProperty("end");
      expect(typeof result.start).toBe("string");
      expect(typeof result.end).toBe("string");
    });

    it("should return dates with numeric content", () => {
      const result = createDate(1);
      // toLocaleDateString can return different formats based on locale
      // Just verify it's a string with date-like content (contains numbers)
      expect(result.start).toMatch(/\d/);
      expect(result.end).toMatch(/\d/);
    });

    it("should handle current week without errors", () => {
      const currentWeek = Math.floor(new Date().getTime() / (7 * 24 * 60 * 60 * 1000));
      const result = createDate(currentWeek);
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
      expect(result.start.length).toBeGreaterThan(0);
      expect(result.end.length).toBeGreaterThan(0);
    });

    it("should handle week 1 without errors", () => {
      const result = createDate(1);
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
      expect(result.start.length).toBeGreaterThan(0);
      expect(result.end.length).toBeGreaterThan(0);
    });

    it("should handle week 52 without errors", () => {
      const result = createDate(52);
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
      expect(result.start.length).toBeGreaterThan(0);
      expect(result.end.length).toBeGreaterThan(0);
    });

    it("should have start and end dates as non-empty strings", () => {
      const week1 = createDate(1);
      const week2 = createDate(2);
      expect(week1.start).not.toBe("");
      expect(week1.end).not.toBe("");
      expect(week2.start).not.toBe("");
      expect(week2.end).not.toBe("");
    });

    it("should return valid date strings with year", () => {
      const result = createDate(1);
      // Check if year appears in date string (20xx format)
      const hasYear = /20\d{2}/.test(result.start) || /20\d{2}/.test(result.end);
      expect(hasYear).toBe(true);
    });

    it("should return 7 days difference between consecutive weeks", () => {
      const week_1 = createDate(1);
      const week_2 = createDate(2);
      // Parsuj daty i sprawdź różnicę 7 dni
      const parse_dd_mm_yyyy = (s: string) => {
        const [d, m, y] = s.split(".").map(Number);
        return new Date(y, m - 1, d);
      };
      const date_1 = parse_dd_mm_yyyy(week_1.start);
      const date_2 = parse_dd_mm_yyyy(week_2.start);
      const diff = (date_2.getTime() - date_1.getTime()) / (1000 * 60 * 60 * 24);
      expect(diff).toBe(7);
    });

    it("should return monday as start and sunday as end", () => {
      const result = createDate(5);
      const [d, m, y] = result.start.split(".").map(Number);
      const start_date = new Date(y, m - 1, d);
      expect(start_date.getDay()).toBe(1); // 1 = poniedziałek

      const [d2, m2, y2] = result.end.split(".").map(Number);
      const end_date = new Date(y2, m2 - 1, d2);
      expect(end_date.getDay()).toBe(0); // 0 = niedziela
    });

    it("should return end date 6 days after start date", () => {
      const result = createDate(10);
      const [d, m, y] = result.start.split(".").map(Number);
      const [d2, m2, y2] = result.end.split(".").map(Number);
      const start = new Date(y, m - 1, d);
      const end = new Date(y2, m2 - 1, d2);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      expect(diff).toBe(6);
    });
  });
});
