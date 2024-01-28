import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Circle: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <circle
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        cx="12"
        cy="12"
        r="11"
      />
    </svg>
  );
};
