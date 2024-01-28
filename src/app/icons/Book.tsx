import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Book: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <g clipPath="url(#clip0_600_740)">
        <path
          d="M3.72217 17.04V2.04004C3.72217 1.77482 3.82752 1.52047 4.01506 1.33293C4.2026 1.1454 4.45695 1.04004 4.72217 1.04004H16.7222C16.9874 1.04004 17.2417 1.1454 17.4293 1.33293C17.6168 1.52047 17.7222 1.77482 17.7222 2.04004V14.04C17.7222 14.3053 17.6168 14.5596 17.4293 14.7471C17.2417 14.9347 16.9874 15.04 16.7222 15.04H5.72217C5.19173 15.04 4.68303 15.2508 4.30795 15.6258C3.93288 16.0009 3.72217 16.5096 3.72217 17.04ZM3.72217 17.04C3.72217 17.5705 3.93288 18.0792 4.30795 18.4543C4.68303 18.8293 5.19173 19.04 5.72217 19.04H17.7222M7.72217 15.04V1.04004M15.7222 19.04V15.04"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_600_740">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5 0.0400391)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
