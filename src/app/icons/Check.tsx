import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Check: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path d="M20.774 6.212a.75.75 0 0 1 .016 1.06l-11.163 11.5a.75.75 0 0 1-1.05.025l-5.34-5a.75.75 0 1 1 1.026-1.094l4.8 4.496 10.65-10.971a.75.75 0 0 1 1.061-.016Z"></path>
    </svg>
  );
};
