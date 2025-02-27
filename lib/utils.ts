import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const priceFormatter = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    currency: "UGX",
    style: "currency",
    minimumFractionDigits: 0
  }).format(price);

  return formattedPrice
}
