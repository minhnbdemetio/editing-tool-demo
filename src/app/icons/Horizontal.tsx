import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Horizontal: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M4 6.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H4ZM4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
