import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Edit: React.FC<IconProps> = ({ className }) => {
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
        d="M13.6996 19.938H20.0766"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8549 4.99565C13.5919 4.05665 14.7829 4.10565 15.7229 4.84265L17.1129 5.93265C18.0529 6.66965 18.3859 7.81265 17.6489 8.75365L9.3599 19.3286C9.0829 19.6826 8.6599 19.8916 8.2099 19.8966L5.0129 19.9376L4.2889 16.8226C4.1869 16.3856 4.2889 15.9256 4.5659 15.5706L12.8549 4.99565Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3026 6.97607L16.0966 10.7341"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
