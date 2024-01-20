import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Line: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        stroke="currentColor"
        fill="currentColor"
        d="M 0 24
        L 0 24, 24 0Z"
      ></path>
    </svg>
  );
};
