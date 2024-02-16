import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineStartOutlinedCircle: React.FC<IconProps> = ({ className }) => {
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
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zM7 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
