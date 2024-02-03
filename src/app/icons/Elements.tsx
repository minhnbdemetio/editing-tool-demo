import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Elements: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('w-6 h-6', className)}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_739_10117)">
        <path
          d="M6.06187 3.44L6.75878 2.72C7.12844 2.33809 7.62981 2.12353 8.15259 2.12353C8.67537 2.12353 9.17674 2.33809 9.5464 2.72C9.91606 3.10191 10.1237 3.6199 10.1237 4.16C10.1237 4.7001 9.91606 5.21809 9.5464 5.6L6.06187 9.2L2.57734 5.6C2.20767 5.21809 2 4.7001 2 4.16C2 3.6199 2.20767 3.10191 2.57734 2.72C2.947 2.33809 3.44837 2.12353 3.97115 2.12353C4.49393 2.12353 4.9953 2.33809 5.36496 2.72L6.06187 3.44ZM12.5663 9.2L16.2832 2L20 9.2H12.5663ZM2.57734 12.56H9.5464V19.76H2.57734V12.56ZM16.2832 12.32C15.2974 12.32 14.352 12.7246 13.655 13.4447C12.9579 14.1648 12.5663 15.1416 12.5663 16.16C12.5663 17.1784 12.9579 18.1551 13.655 18.8753C14.352 19.5954 15.2974 20 16.2832 20C17.2689 20 18.2143 19.5954 18.9114 18.8753C19.6084 18.1551 20 17.1784 20 16.16C20 15.1416 19.6084 14.1648 18.9114 13.4447C18.2143 12.7246 17.2689 12.32 16.2832 12.32Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_739_10117">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
