import clsx, { ClassValue } from 'clsx';
import { twMerge as baseTwMerge } from 'tailwind-merge';

export const twMerge = (...classes: ClassValue[]) => {
  return baseTwMerge(clsx(classes));
};
