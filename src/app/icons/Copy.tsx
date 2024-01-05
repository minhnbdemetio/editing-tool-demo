import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Copy: React.FC<IconProps> = ({ className }) => {
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
        d="M15 5.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h2.5v-1.5H5a.5.5 0 0 1-.5-.5V5c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5v.5H15zm-4 3a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h8a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-8zM11 7h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2z"
      ></path>
    </svg>
  );
};
