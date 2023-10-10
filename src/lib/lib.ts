import { Prospect } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName: string | undefined | null) => {
  // console.log(fullName);
  if (fullName) {
    const allNames = fullName.trim().split(" ");
    const initials = allNames.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, "");
    return initials;
  }
  return "U";
};

export const getProspectNames = (prospect: Prospect | undefined) => {
  if (prospect) return prospect.firstName + " " + prospect.lastName;
  else return "";
};
