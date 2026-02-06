import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClassesFilter } from "./use_classes_filter";

/**
 * Unit tests for useClassesFilter hook
 * Tests filter state management and toggle actions
 */

describe("use_classes_filter", () => {
  describe("Initial state", () => {
    it("should initialize with all colors enabled", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
    });

    it("should initialize with show_dates as false", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.show_dates).toBe(false);
    });

    it("should initialize with week_from as null", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.week_from).toBe(null);
    });

    it("should initialize with week_to as null", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.week_to).toBe(null);
    });

    it("should provide all required methods", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(typeof result.current.toggle_color).toBe("function");
      expect(typeof result.current.toggle_show_all).toBe("function");
      expect(typeof result.current.set_week_from_filter).toBe("function");
      expect(typeof result.current.set_week_to_filter).toBe("function");
      expect(typeof result.current.reset_filters).toBe("function");
    });
  });

  describe("toggle_color", () => {
    it("should toggle red color filter", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.sort.red).toBe(true);

      act(() => {
        result.current.toggle_color("red");
      });

      expect(result.current.sort.red).toBe(false);

      act(() => {
        result.current.toggle_color("red");
      });

      expect(result.current.sort.red).toBe(true);
    });

    it("should toggle green color filter", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.sort.green).toBe(true);

      act(() => {
        result.current.toggle_color("green");
      });

      expect(result.current.sort.green).toBe(false);
    });

    it("should toggle yellow color filter", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.sort.yellow).toBe(true);

      act(() => {
        result.current.toggle_color("yellow");
      });

      expect(result.current.sort.yellow).toBe(false);
    });

    it("should not affect other colors when toggling one", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
      });

      expect(result.current.sort.red).toBe(false);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
    });

    it("should handle multiple toggles correctly", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.toggle_color("green");
        result.current.toggle_color("yellow");
      });

      expect(result.current.sort.red).toBe(false);
      expect(result.current.sort.green).toBe(false);
      expect(result.current.sort.yellow).toBe(false);
    });
  });

  describe("toggle_show_all", () => {
    it("should toggle show_dates from false to true", () => {
      const { result } = renderHook(() => useClassesFilter());

      expect(result.current.show_dates).toBe(false);

      act(() => {
        result.current.toggle_show_all();
      });

      expect(result.current.show_dates).toBe(true);
    });

    it("should toggle show_dates from true to false", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_show_all();
      });

      expect(result.current.show_dates).toBe(true);

      act(() => {
        result.current.toggle_show_all();
      });

      expect(result.current.show_dates).toBe(false);
    });

    it("should toggle multiple times correctly", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_show_all();
        result.current.toggle_show_all();
        result.current.toggle_show_all();
      });

      expect(result.current.show_dates).toBe(true);
    });
  });

  describe("Week range filters", () => {
    it("should set week_from to a number", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_from_filter(10);
      });

      expect(result.current.week_from).toBe(10);
    });

    it("should set week_from to null", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_from_filter(10);
        result.current.set_week_from_filter(null);
      });

      expect(result.current.week_from).toBe(null);
    });

    it("should set week_to to a number", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_to_filter(20);
      });

      expect(result.current.week_to).toBe(20);
    });

    it("should set week_to to null", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_to_filter(20);
        result.current.set_week_to_filter(null);
      });

      expect(result.current.week_to).toBe(null);
    });

    it("should handle both week_from and week_to together", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_from_filter(5);
        result.current.set_week_to_filter(15);
      });

      expect(result.current.week_from).toBe(5);
      expect(result.current.week_to).toBe(15);
    });

    it("should update week_from multiple times", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_from_filter(10);
        result.current.set_week_from_filter(20);
        result.current.set_week_from_filter(30);
      });

      expect(result.current.week_from).toBe(30);
    });
  });

  describe("reset_filters", () => {
    it("should reset all color filters to true", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.toggle_color("green");
        result.current.toggle_color("yellow");
      });

      expect(result.current.sort.red).toBe(false);
      expect(result.current.sort.green).toBe(false);
      expect(result.current.sort.yellow).toBe(false);

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
    });

    it("should reset show_dates to false", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_show_all();
      });

      expect(result.current.show_dates).toBe(true);

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.show_dates).toBe(false);
    });

    it("should reset week_from and week_to to null", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.set_week_from_filter(10);
        result.current.set_week_to_filter(20);
      });

      expect(result.current.week_from).toBe(10);
      expect(result.current.week_to).toBe(20);

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.week_from).toBe(null);
      expect(result.current.week_to).toBe(null);
    });

    it("should reset both filters and show_dates together", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.toggle_color("green");
        result.current.toggle_show_all();
      });

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
      expect(result.current.show_dates).toBe(false);
    });

    it("should reset all filters including week range", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.toggle_show_all();
        result.current.set_week_from_filter(5);
        result.current.set_week_to_filter(15);
      });

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
      expect(result.current.show_dates).toBe(false);
      expect(result.current.week_from).toBe(null);
      expect(result.current.week_to).toBe(null);
    });

    it("should not affect state if already in default state", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.reset_filters();
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
      expect(result.current.show_dates).toBe(false);
      expect(result.current.week_from).toBe(null);
      expect(result.current.week_to).toBe(null);
    });
  });

  describe("State isolation between hook instances", () => {
    it("should maintain separate state for different hook instances", () => {
      const { result: result1 } = renderHook(() => useClassesFilter());
      const { result: result2 } = renderHook(() => useClassesFilter());

      act(() => {
        result1.current.toggle_color("red");
      });

      expect(result1.current.sort.red).toBe(false);
      expect(result2.current.sort.red).toBe(true);
    });
  });

  describe("Complex scenarios", () => {
    it("should handle mixed operations correctly", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.toggle_show_all();
        result.current.toggle_color("green");
      });

      expect(result.current.sort.red).toBe(false);
      expect(result.current.sort.green).toBe(false);
      expect(result.current.sort.yellow).toBe(true);
      expect(result.current.show_dates).toBe(true);

      act(() => {
        result.current.toggle_color("red");
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.show_dates).toBe(true);
    });

    it("should maintain state through multiple resets", () => {
      const { result } = renderHook(() => useClassesFilter());

      act(() => {
        result.current.toggle_color("red");
        result.current.reset_filters();
        result.current.toggle_color("green");
        result.current.reset_filters();
      });

      expect(result.current.sort.red).toBe(true);
      expect(result.current.sort.green).toBe(true);
      expect(result.current.sort.yellow).toBe(true);
    });
  });
});
