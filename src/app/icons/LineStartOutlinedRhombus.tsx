import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const LineStartOutlinedRhombus: React.FC<IconProps> = ({
  className,
}) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.25 12a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 8.931 4.931 12 8 15.069 11.069 12 8 8.931zm.324-1.797a.459.459 0 0 0-.648 0l-4.542 4.542a.458.458 0 0 0 0 .648l4.542 4.542c.179.179.47.179.648 0l4.542-4.542a.458.458 0 0 0 0-.648L8.324 7.134z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
