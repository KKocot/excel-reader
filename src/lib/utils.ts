import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSchoolName(data: Item[], kwap: string[]) {
  const school = data.filter((item) => kwap.includes(item.school));

  return school;
}
