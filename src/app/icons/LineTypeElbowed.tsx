import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineTypeElbowed: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 7.5v0a4.25 4.25 0 0 1-4.25 4.25h-4.5A4.25 4.25 0 0 0 5.5 16v0"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>
      <rect
        x="16.75"
        y="3.75"
        width="3.5"
        height="3.5"
        rx="1.75"
        fill="#EEEEEF"
        stroke="currentColor"
        stroke-width="1.5"
      ></rect>
      <rect
        x="3.75"
        y="16.75"
        width="3.5"
        height="3.5"
        rx="1.75"
        fill="#EEEEEF"
        stroke="currentColor"
        stroke-width="1.5"
      ></rect>
    </svg>
  );
};
