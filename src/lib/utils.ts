import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassesGroupProps, ClassStatus, StatusColor } from "@/types";
import { startOfWeek, addWeeks, addDays, format } from "date-fns";

// ============================================================================
// Utility functions
// ============================================================================

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getSchool(data: ClassesGroupProps[][]): ClassesGroupProps[][] {
  const school = data.filter((item) => item[0].Textbox5.split("\r")[0]);
  return school;
}

// ============================================================================
// Type guards
// ============================================================================

/**
 * Type guard to check if value is a string
 */
export function is_string(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard to check if value is a valid ClassStatus
 */
export function is_class_status(value: unknown): value is ClassStatus {
  const valid_statuses: ClassStatus[] = [
    "spotkanie_do_akceptacji",
    "spotkanie_zaakceptowane",
    "odwolal_wolontariusz",
    "odwolalo_dziecko",
    "brak_zajec",
    "wydarzenie_do_akceptacji",
    "wydarzenie_zaakceptowane",
    "odrabianie_zajec_zaakceptowane",
    "odrabianie_zajec_do_akceptacji",
  ];
  return typeof value === "string" && valid_statuses.includes(value as ClassStatus);
}

/**
 * Type guard to check if value is an array of unknown elements
 */
export function is_unknown_array(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Type guard to check if value is a Record<string, unknown>
 */
export function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ============================================================================
// Status color mapping (centralized)
// ============================================================================

/**
 * Maps ClassStatus to StatusColor for UI display
 * green: accepted/scheduled meetings
 * yellow: cancelled by volunteer/student
 * red: no classes or unknown status
 */
export function get_status_color(status: ClassStatus): StatusColor {
  switch (status) {
    case "spotkanie_do_akceptacji":
    case "spotkanie_zaakceptowane":
    case "wydarzenie_do_akceptacji":
    case "wydarzenie_zaakceptowane":
    case "odrabianie_zajec_zaakceptowane":
    case "odrabianie_zajec_do_akceptacji":
      return "green";
    case "odwolal_wolontariusz":
    case "odwolalo_dziecko":
      return "yellow";
    case "brak_zajec":
      return "red";
    default:
      return "red";
  }
}

/**
 * Get CSS classes for status color badge
 */
export function get_status_color_classes(color: StatusColor): string {
  switch (color) {
    case "green":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
    case "yellow":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
    case "red":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// ============================================================================
// Date utilities
// ============================================================================

export const createDate = (week: number): { start: string; end: string } => {
  const current_year = new Date().getFullYear();
  // 4 stycznia jest ZAWSZE w ISO tygodniu 1 danego roku
  const jan_4 = new Date(current_year, 0, 4);
  const first_monday = startOfWeek(jan_4, { weekStartsOn: 1 });
  const week_start = addWeeks(first_monday, week - 1);
  const week_end = addDays(week_start, 6);

  const format_date = (date: Date): string => format(date, "dd.MM.yyyy");

  return {
    start: format_date(week_start),
    end: format_date(week_end),
  };
};
