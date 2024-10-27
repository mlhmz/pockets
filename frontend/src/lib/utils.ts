import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isIndexFirstListEntry(index: number) {
  return index === 0;
}

export function isIndexLastListEntry(index: number, list: unknown[]) {
  return index === list.length - 1;
}
