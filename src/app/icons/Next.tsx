import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Next: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path d="M8.215 3.224a.785.785 0 0 0 0 1.08l7.238 7.517c.096.1.096.26 0 .36l-7.238 7.517a.785.785 0 0 0 0 1.08.716.716 0 0 0 1.04 0l7.238-7.516c.67-.697.67-1.825 0-2.522L9.256 3.224a.716.716 0 0 0-1.04 0Z"></path>
    </svg>
  );
};
