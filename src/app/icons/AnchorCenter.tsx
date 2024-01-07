import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const AnchorCenter: React.FC<IconProps> = ({ className }) => {
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
        d="M8 12.75h3.25v5.97l-2.22-2.21a.75.75 0 0 0-1.06 1.06l2.83 2.82c.68.69 1.79.69 2.47 0l2.83-2.82a.75.75 0 0 0-1.06-1.06l-2.29 2.29v-6.05h6.5a.75.75 0 1 0 0-1.5h-6.5V5.28l2.3 2.29A.75.75 0 0 0 16.1 6.5l-2.83-2.83a1.75 1.75 0 0 0-2.47 0L7.97 6.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.9h-6.5a.75.75 0 1 0 0 1.5H8z"
      ></path>
    </svg>
  );
};
