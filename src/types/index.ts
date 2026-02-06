/**
 * Central type definitions for excel-reader application
 */

// ============================================================================
// Core data types from CSV parsing
// ============================================================================

export type StatusColor = "red" | "green" | "yellow";

export type ClassStatus =
  | "spotkanie_do_akceptacji"
  | "spotkanie_zaakceptowane"
  | "odwolal_wolontariusz"
  | "wydarzenie_do_akceptacji"
  | "odwolalo_dziecko"
  | "wydarzenie_zaakceptowane"
  | "brak_zajec"
  | "odrabianie_zajec_zaakceptowane"
  | "odrabianie_zajec_do_akceptacji"
  | null;

export interface Item {
  pair: string;
  classes: { week: number; status: ClassStatus; status_color: StatusColor }[];
  connected: number;
}

export interface ClassesGroupProps {
  Textbox5: string;
  __parsed_extra: unknown[];
}

// ============================================================================
// Processed data types (after raportGenarator)
// ============================================================================

export interface WeekItem {
  week: number;
  check: boolean;
  status: ClassStatus;
  status_color: StatusColor;
}

export interface ListItem {
  connected: number;
  pair: string;
  fullWeeks: WeekItem[];
}

export interface ListProps {
  title: string;
  list: ListItem[];
}

// ============================================================================
// UI state types
// ============================================================================

export interface Sort {
  red: boolean;
  green: boolean;
  yellow: boolean;
}

// ============================================================================
// Raw table data (for non-Kwap files)
// ============================================================================

export type RawCellValue = string | number | boolean | null;
export type RawTableData = RawCellValue[][];
