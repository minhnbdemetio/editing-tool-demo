import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineStartRhombus: React.FC<IconProps> = ({ className }) => {
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
        d="M11.25 12a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M7.676 7.134a.458.458 0 0 1 .648 0l4.542 4.542a.458.458 0 0 1 0 .648l-4.542 4.542a.458.458 0 0 1-.648 0l-4.542-4.542a.459.459 0 0 1 0-.648l4.542-4.542z"
      ></path>
    </svg>
  );
};
