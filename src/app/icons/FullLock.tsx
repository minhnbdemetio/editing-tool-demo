import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const FullLock: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M14.5 6.25a.75.75 0 0 0 1.5 0V6a4 4 0 0 0-8 0v3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3H9.5V6a2.5 2.5 0 0 1 5 0v.25ZM7 10.5h10a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19v-7A1.5 1.5 0 0 1 7 10.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
