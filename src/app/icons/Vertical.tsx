import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Vertical: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M17.5 4a.5.5 0 0 0-.5-.5H7a.5.5 0 0 0-.5.5v16a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4ZM19 4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
