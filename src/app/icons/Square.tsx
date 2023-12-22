import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Square: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M19 4.5H5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5ZM5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
