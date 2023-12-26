import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Prev: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path d="M15.78 3.224a.785.785 0 0 1 0 1.08l-7.237 7.517a.262.262 0 0 0 0 .36l7.237 7.517a.785.785 0 0 1 0 1.08.716.716 0 0 1-1.04 0l-7.237-7.516a1.832 1.832 0 0 1 0-2.522l7.237-7.516a.716.716 0 0 1 1.04 0Z"></path>
    </svg>
  );
};
