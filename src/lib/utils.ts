import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// this doesn't correctly type the value with the specific key provided
// but creating the updater function inside a component does work right...
// export const getStateUpdater = <T extends Object>(
//   stateSetter: React.Dispatch<React.SetStateAction<T>>,
// ) => {
//   type K = keyof T;

//   return (key: K, value: T[K]) =>
//     stateSetter((prev) => ({ ...prev, [key]: value }));
// };
