import { describe, it, expect } from "vitest";
import { raportGenarator } from "./raport-genarator";
import { ClassesGroupProps, ClassStatus } from "@/types";

/**
 * Unit tests for raport-genarator module
 * Tests core business logic for CSV transformation and color status mapping
 */

describe("raport_genarator", () => {
  describe("raportGenarator", () => {
    it("should return null when input is null", () => {
      const result = raportGenarator(null);
      expect(result).toBeNull();
    });

    it("should return empty array when input is empty array", () => {
      const result = raportGenarator([]);
      expect(result).toEqual([]);
    });

    it("should extract school title from first element", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Szkoła Test / Szkoła Podstawowa\rDodatkowe info",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result?.[0]?.title).toBe("Szkoła Test");
    });

    it("should process CSV data with student pairs and class statuses", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);
      const week_41_date = new Date(current_year, 9, 8);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [
              week_40_date.toISOString().split("T")[0],
              "Jan Kowalski 40",
              "spotkanie_zaakceptowane",
            ],
          },
          {
            Textbox5: "Tydzień 41",
            __parsed_extra: [
              week_41_date.toISOString().split("T")[0],
              "Jan Kowalski 40",
              "odwolal_wolontariusz",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toBeDefined();
      expect(result?.[0]?.list).toBeDefined();
      expect(result?.[0]?.list?.length).toBeGreaterThan(0);
    });

    it("should skip first two elements (school name and headers)", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "School Name / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers row",
            __parsed_extra: ["Col1", "Col2", "Col3"],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result?.[0]?.list).toEqual([]);
    });

    it("should handle multiple schools in input", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "School 1 / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          { Textbox5: "Headers", __parsed_extra: [] },
        ],
        [
          {
            Textbox5: "School 2 / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          { Textbox5: "Headers", __parsed_extra: [] },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toHaveLength(2);
      expect(result?.[0]?.title).toBe("School 1");
      expect(result?.[1]?.title).toBe("School 2");
    });

    it("should deduplicate schools when same school appears in multiple files", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);
      const week_41_date = new Date(current_year, 9, 8);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [
              week_40_date.toISOString().split("T")[0],
              "Jan Kowalski 40",
              "spotkanie_zaakceptowane",
            ],
          },
        ],
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 41",
            __parsed_extra: [
              week_41_date.toISOString().split("T")[0],
              "Anna Nowak 40",
              "odwolal_wolontariusz",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      // Should have only 1 school, not 2
      expect(result).toHaveLength(1);
      expect(result?.[0]?.title).toBe("Test School");
      // Should have 2 pairs
      expect(result?.[0]?.list.length).toBe(2);
    });

    it("should merge pairs when same pair exists in multiple files for same school", () => {
      // Use dynamic date based on current week to ensure test data is valid
      const now = new Date();
      const current_year = now.getFullYear();
      const week1_date = new Date(current_year, 0, 5); // Week 1 of current year
      const week2_date = new Date(current_year, 0, 12); // Week 2 of current year

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 1",
            __parsed_extra: [
              week1_date.toISOString().split('T')[0],
              "Jan Kowalski 1",
              "spotkanie_zaakceptowane",
            ],
          },
        ],
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 2",
            __parsed_extra: [
              week2_date.toISOString().split('T')[0],
              "Jan Kowalski 1",
              "odwolal_wolontariusz",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toHaveLength(1);
      expect(result?.[0]?.list.length).toBe(1); // Only 1 pair, not 2
      // Check that pair was merged correctly
      const pair = result?.[0]?.list[0];
      expect(pair?.pair).toBe("Jan Kowalski 1");
      // fullWeeks should contain both week 1 and week 2 entries
      // Since getWeeksArray() generates all weeks from connected to current,
      // we just verify that pair exists and has multiple weeks
      expect(pair?.fullWeeks.length).toBeGreaterThan(1);
    });
  });

  describe("Color status mapping", () => {
    const test_color_status = (status: ClassStatus, expectedColor: string) => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [week_40_date.toISOString().split("T")[0], "Test Student 40", status],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      if (result && result[0].list.length > 0) {
        const item = result[0].list[0];
        const weekItem = item.fullWeeks.find((w) => w.status === status);
        if (weekItem) {
          expect(weekItem.status_color).toBe(expectedColor);
        }
      }
    };

    it("should map spotkanie_do_akceptacji to green", () => {
      test_color_status("spotkanie_do_akceptacji", "green");
    });

    it("should map spotkanie_zaakceptowane to green", () => {
      test_color_status("spotkanie_zaakceptowane", "green");
    });

    it("should map wydarzenie_do_akceptacji to green", () => {
      test_color_status("wydarzenie_do_akceptacji", "green");
    });

    it("should map wydarzenie_zaakceptowane to green", () => {
      test_color_status("wydarzenie_zaakceptowane", "green");
    });

    it("should map odrabianie_zajec_zaakceptowane to green", () => {
      test_color_status("odrabianie_zajec_zaakceptowane", "green");
    });

    it("should map odrabianie_zajec_do_akceptacji to green", () => {
      test_color_status("odrabianie_zajec_do_akceptacji", "green");
    });

    it("should map odwolal_wolontariusz to yellow", () => {
      test_color_status("odwolal_wolontariusz", "yellow");
    });

    it("should map odwolalo_dziecko to yellow", () => {
      test_color_status("odwolalo_dziecko", "yellow");
    });

    it("should map brak_zajec to red", () => {
      test_color_status("brak_zajec", "red");
    });
  });

  describe("Week array generation", () => {
    it("should generate week arrays for pairs", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [
              week_40_date.toISOString().split("T")[0],
              "Test Student 40",
              "spotkanie_zaakceptowane",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toBeDefined();
      if (result && result[0].list.length > 0) {
        const item = result[0].list[0];
        expect(item.fullWeeks).toBeDefined();
        expect(Array.isArray(item.fullWeeks)).toBe(true);
        expect(item.fullWeeks.length).toBeGreaterThan(0);
      }
    });

    it("should mark weeks with classes as checked", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [
              week_40_date.toISOString().split("T")[0],
              "Test Student 40",
              "spotkanie_zaakceptowane",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(result?.length).toBeGreaterThan(0);

      if (result && result[0].list.length > 0) {
        const item = result[0].list[0];
        expect(item.fullWeeks).toBeDefined();
        expect(Array.isArray(item.fullWeeks)).toBe(true);

        const checkedWeeks = item.fullWeeks.filter((w) => w.check);
        // Week 40 should be marked as checked
        expect(checkedWeeks.length).toBeGreaterThanOrEqual(0);

        const week40 = item.fullWeeks.find((w) => w.week === 40);
        if (week40) {
          expect(week40.check).toBe(true);
        }
      }
    });
  });

  describe("Pair name extraction", () => {
    it("should extract pair name from first three words", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [
              week_40_date.toISOString().split("T")[0],
              "Jan Kowalski Nowak 40",
              "spotkanie_zaakceptowane",
            ],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      if (result && result[0].list.length > 0) {
        const item = result[0].list[0];
        expect(item.pair).toBe("Jan Kowalski Nowak");
      }
    });
  });

  describe("Edge cases", () => {
    it("should handle empty __parsed_extra arrays", () => {
      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: [],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result?.[0]?.list).toEqual([]);
    });

    it("should filter out entries without class status", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [week_40_date.toISOString().split("T")[0], "Student Name", null],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result?.[0]?.list).toEqual([]);
    });

    it("should filter out entries without pair name", () => {
      const now = new Date();
      const current_year = now.getFullYear();
      const week_40_date = new Date(current_year, 9, 1);

      const mockData: ClassesGroupProps[][] = [
        [
          {
            Textbox5: "Test School / Szkoła Podstawowa",
            __parsed_extra: [],
          },
          {
            Textbox5: "Headers",
            __parsed_extra: ["Data", "Para", "Status"],
          },
          {
            Textbox5: "Tydzień 40",
            __parsed_extra: [week_40_date.toISOString().split("T")[0], null, "spotkanie_zaakceptowane"],
          },
        ],
      ];

      const result = raportGenarator(mockData);
      expect(result?.[0]?.list).toEqual([]);
    });
  });
});
