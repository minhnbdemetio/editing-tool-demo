import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const ArrowToLeft: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M6.9 10.996h11.596a.75.75 0 0 1 0 1.5H6.9l4.377 4.377a.75.75 0 0 1-1.061 1.06l-4.95-4.95a1.75 1.75 0 0 1 0-2.474l4.95-4.95a.75.75 0 1 1 1.06 1.06L6.9 10.996z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
