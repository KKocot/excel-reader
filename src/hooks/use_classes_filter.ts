import { useState } from "react";
import { Sort, StatusColor } from "@/types";

/**
 * Custom hook for managing Classes filtering state
 * Handles color filter toggles (red/green/yellow), show all dates option, and week range filtering
 */
export function useClassesFilter() {
  const [sort, set_sort] = useState<Sort>({
    red: true,
    green: true,
    yellow: true,
  });

  const [show_dates, set_show_dates] = useState<boolean>(false);
  const [week_from, set_week_from] = useState<number | null>(null);
  const [week_to, set_week_to] = useState<number | null>(null);

  /**
   * Toggle specific color filter
   */
  const toggle_color = (color: StatusColor) => {
    set_sort((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  /**
   * Toggle show all dates option
   */
  const toggle_show_all = () => {
    set_show_dates((prev) => !prev);
  };

  /**
   * Set week from filter
   */
  const set_week_from_filter = (value: number | null) => {
    set_week_from(value);
  };

  /**
   * Set week to filter
   */
  const set_week_to_filter = (value: number | null) => {
    set_week_to(value);
  };

  /**
   * Reset all filters to default state
   */
  const reset_filters = () => {
    set_sort({ red: true, green: true, yellow: true });
    set_show_dates(false);
    set_week_from(null);
    set_week_to(null);
  };

  return {
    sort,
    show_dates,
    week_from,
    week_to,
    toggle_color,
    toggle_show_all,
    set_week_from_filter,
    set_week_to_filter,
    reset_filters,
  };
}
