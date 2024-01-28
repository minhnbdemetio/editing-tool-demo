import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Widget: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="#2C3340"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="#2C3340"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="#2C3340"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="#2C3340"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
