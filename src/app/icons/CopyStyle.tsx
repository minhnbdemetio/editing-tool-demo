import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const CopyStyle: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M7 2a3 3 0 0 0 0 6h10a3.001 3.001 0 0 0 2.905-2.25h.345a.25.25 0 0 1 .25.25v2.09c0 .691-.56 1.25-1.25 1.25h-6.132a1.75 1.75 0 0 0-1.75 1.75v.914A2 2 0 0 0 9.5 14v6a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-6a2 2 0 0 0-1.632-1.966v-.943a.25.25 0 0 1 .25-.25h6.132A2.75 2.75 0 0 0 22 8.09V6a1.75 1.75 0 0 0-1.75-1.75h-.345A3.001 3.001 0 0 0 17 2H7Zm10 1.5H7a1.5 1.5 0 1 0 0 3h10a1.5 1.5 0 0 0 0-3Zm-5.5 10h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
