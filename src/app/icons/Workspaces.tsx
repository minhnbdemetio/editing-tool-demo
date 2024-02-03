import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Workspaces: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M2 7.625H11M11 14.375H20M11 2V20M2 4.25C2 3.65326 2.23705 3.08097 2.65901 2.65901C3.08097 2.23705 3.65326 2 4.25 2H17.75C18.3467 2 18.919 2.23705 19.341 2.65901C19.7629 3.08097 20 3.65326 20 4.25V17.75C20 18.3467 19.7629 18.919 19.341 19.341C18.919 19.7629 18.3467 20 17.75 20H4.25C3.65326 20 3.08097 19.7629 2.65901 19.341C2.23705 18.919 2 18.3467 2 17.75V4.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
