import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineStartCircle: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.75 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75z"
        clipRule="evenodd"
      ></path>
      <path fill="currentColor" d="M3 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"></path>
    </svg>
  );
};
