import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const SelectMultiple: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.75 6A.75.75 0 0 1 3 5.25V4a1 1 0 0 1 1-1h1.25a.75.75 0 0 1 0 1.5h-.5a.25.25 0 0 0-.25.25v.5a.75.75 0 0 1-.75.75ZM15 3.75a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 .75-.75ZM18.75 3a.75.75 0 0 0 0 1.5h.5a.25.25 0 0 1 .25.25v.5a.75.75 0 0 0 1.5 0V4a1 1 0 0 0-1-1h-1.25ZM21 9.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Zm0 9a.75.75 0 0 0-1.5 0v.5a.25.25 0 0 1-.25.25h-.5a.75.75 0 0 0 0 1.5H20a1 1 0 0 0 1-1v-1.25ZM14.25 21a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Zm-9 0a.75.75 0 0 0 0-1.5h-.5a.25.25 0 0 1-.25-.25v-.5a.75.75 0 0 0-1.5 0V20a1 1 0 0 0 1 1h1.25ZM3 14.25a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.5 0v4.5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
