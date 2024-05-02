// import { StoreListType } from "@/types";
// import algoliasearch from "algoliasearch/dist/algoliasearch-lite";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeDifference = (
  timestamp: Date | undefined | null
): string => {
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
  // Split the address by commas and spaces and remove unnecessary whitespaces
  const parts: string[] = address
    .split(/[, ]+/)
    .map((part) => part.trim().toLowerCase())
    // Filter out elements starting with "no" or containing numeric values
    .filter((part) => !/^\d+$/.test(part) && !/^no$/i.test(part))
    // Replace forward slashes with an empty string
    .map((part) => part.replace(/\//g, ""))
    // Remove numeric characters from each part
    .map((part) => part.replace(/\d/g, ""));

  // Use a set to remove duplicates and then convert it back to an array
  const uniqueParts: string[] = [...new Set(parts)];

  return uniqueParts;
}


export function extractGoogleMapsLinkFromIframe(iframeHTML: string) {
  const urlPattern = /src="(.*?)"/;
  const match = iframeHTML.match(urlPattern);
  return match ? match[1] : "";
}

export function extractYoutubeLinkFromIframe(iframeHTML: string) {
  const urlPattern = /src="(.*?)"/;
  const match = iframeHTML.match(urlPattern);
  return match ? match[1] : "";
}