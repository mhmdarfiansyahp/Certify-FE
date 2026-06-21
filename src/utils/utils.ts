import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clearField = (setErrors: any, field: string) => {
  setErrors((prev: any) => ({
    ...prev,
    [field]: "",
  }));
};
