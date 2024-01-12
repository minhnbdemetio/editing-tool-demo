import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineStartNone: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M3.25 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M3.75 8a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 3.75 8z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};
