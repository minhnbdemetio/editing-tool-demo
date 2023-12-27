import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Information: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path d="M13 17a1 1 0 1 1-2 0v-5.5a1 1 0 1 1 2 0V17Zm.25-9.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"></path>
      <path
        fillRule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-1.5 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
