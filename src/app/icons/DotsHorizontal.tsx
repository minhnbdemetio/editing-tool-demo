import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const DotsHorizontal: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <ellipse
        cx="7.38462"
        cy="16.0001"
        rx="2.46154"
        ry="2.46154"
        fill="currentColor"
      />
      <circle cx="16" cy="16.0001" r="2.46154" fill="currentColor" />
      <circle cx="24.6154" cy="16.0001" r="2.46154" fill="currentColor" />
    </svg>
  );
};
