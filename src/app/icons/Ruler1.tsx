import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Ruler1: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M15.6 16.1402V19.7402M19.2 16.1402V19.7402M8.39995 8.94023H4.79995M8.39995 5.34023H4.79995M8.39995 12.5402H4.79995M12 16.1402V19.7402M21.5999 16.1402H8.39995V2.94023C8.39995 2.62197 8.27352 2.31675 8.04848 2.09171C7.82344 1.86666 7.51821 1.74023 7.19995 1.74023H2.39995C2.08169 1.74023 1.77647 1.86666 1.55142 2.09171C1.32638 2.31675 1.19995 2.62197 1.19995 2.94023V23.3402H21.5999C21.9182 23.3402 22.2234 23.2138 22.4485 22.9888C22.6735 22.7637 22.7999 22.4585 22.7999 22.1402V17.3402C22.7999 17.022 22.6735 16.7167 22.4485 16.4917C22.2234 16.2667 21.9182 16.1402 21.5999 16.1402Z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
