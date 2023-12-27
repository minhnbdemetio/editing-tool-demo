import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Link: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={twMerge('w-6 h-6', className)}
    >
      <path d="m4.623 11.539 1.16-1.16a.75.75 0 1 1 1.06 1.06l-1.16 1.16a4.042 4.042 0 0 0 5.717 5.717l1.16-1.16a.75.75 0 0 1 1.061 1.06l-1.16 1.16a5.542 5.542 0 1 1-7.838-7.837Zm13.693-.139-1.16 1.16a.75.75 0 1 0 1.061 1.06l1.16-1.159a5.542 5.542 0 1 0-7.838-7.838l-1.16 1.16a.75.75 0 0 0 1.061 1.06l1.16-1.16a4.042 4.042 0 0 1 5.716 5.717Z"></path>
      <path d="M8.818 15.182a.75.75 0 0 0 1.06 0l5.304-5.303a.75.75 0 0 0-1.06-1.061L8.817 14.12a.75.75 0 0 0 0 1.06Z"></path>
    </svg>
  );
};
