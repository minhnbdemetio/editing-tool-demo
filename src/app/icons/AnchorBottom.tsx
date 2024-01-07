import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const AnchorBottom: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fill="currentColor"
        d="M8 6.75h3.25v8.68l-2.96-2.96a.75.75 0 0 0-1.06 1.06l3.53 3.54c.69.68 1.8.68 2.48 0l3.53-3.54a.75.75 0 0 0-1.06-1.06l-2.96 2.96V6.75h6.5a.75.75 0 1 0 0-1.5H4.75a.75.75 0 0 0 0 1.5H8z"
      ></path>
    </svg>
  );
};
