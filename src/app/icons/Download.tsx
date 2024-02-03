import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Download: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M16 18.6665L15.2929 19.3736L16 20.0807L16.7071 19.3736L16 18.6665ZM17 6.6665C17 6.11422 16.5523 5.6665 16 5.6665C15.4477 5.6665 15 6.11422 15 6.6665L17 6.6665ZM8.62624 12.7069L15.2929 19.3736L16.7071 17.9594L10.0405 11.2927L8.62624 12.7069ZM16.7071 19.3736L23.3738 12.7069L21.9596 11.2927L15.2929 17.9594L16.7071 19.3736ZM17 18.6665L17 6.6665L15 6.6665L15 18.6665L17 18.6665Z"
        fill="currentColor"
      />
      <path
        d="M6.66666 21.3335L6.66666 22.6668C6.66666 24.1396 7.86056 25.3335 9.33332 25.3335L22.6667 25.3335C24.1394 25.3335 25.3333 24.1396 25.3333 22.6668V21.3335"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
