import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassesGroupProps } from "@/types";
import { startOfWeek, addWeeks, addDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSchool(data: ClassesGroupProps[][]) {
  const school = data.filter((item) => item[0].Textbox5.split("\r")[0]);
  return school;
}

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
