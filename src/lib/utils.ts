import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item } from "./types";
import { ClassesGroupProps } from "./raport-genarator";
import { addDays, endOfWeek, getWeek, startOfWeek } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSchoolName(data: Item[], kwap: string[]) {
  const school = data.filter((item) => kwap.includes(item.school));

  return school;
}
export function getSchool(data: ClassesGroupProps[][], kwap: string[]) {
  const school = data.filter((item) =>
    kwap.includes(item[0].Textbox5.split("\r")[0])
  );

  return school;
}

export const createDate = (week: number) => {
  const today = getWeek(new Date());
  const start = addDays(
    startOfWeek(
      new Date(
        new Date().setDate(new Date().getDate() + (week - today) * 7 - 6)
      )
    ),
    1
  ).toLocaleDateString();
  const end = addDays(
    endOfWeek(
      new Date(
        new Date().setDate(new Date().getDate() + (week - today) * 7 - 6)
      )
    ),
    1
  ).toLocaleDateString();
  return { start, end };
};
