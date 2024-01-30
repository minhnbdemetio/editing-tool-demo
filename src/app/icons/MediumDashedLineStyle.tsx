import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const MediumDashedLineStyle: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="-1"
        x2="25"
        y1="50%"
        y2="50%"
        stroke="currentColor"
        stroke-dasharray="12 2"
        strokeWidth="2"
        shape-rendering="crispEdges"
      ></line>
    </svg>
  );
};
