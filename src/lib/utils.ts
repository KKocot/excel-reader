import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item } from "./types";
import { ClassesGroupProps } from "./raport-genarator";

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
