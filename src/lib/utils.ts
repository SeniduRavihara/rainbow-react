import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeDifference = (timestamp: Date | undefined | null): string => {
  if (!timestamp) {
    return "";
  }

  const currentDateTime = new Date();
  const timeDifference = Math.abs(
    currentDateTime.getTime() - timestamp.getTime()
  );

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return "";
  }
};


  export function cleanAddress(address: string): string[] {
    // Split the address by commas and remove unnecessary whitespaces
    const cleanedAddress: string[] = address
      .split(",")
      .map((part) => part.trim());
    return cleanedAddress;
  }