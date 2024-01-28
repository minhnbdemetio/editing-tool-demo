import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Rule: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <g clipPath="url(#clip0_600_769)">
        <path
          d="M13.5 13.04V16.04M16.5 13.04V16.04M7.5 7.04004H4.5M7.5 4.04004H4.5M7.5 10.04H4.5M10.5 13.04V16.04M18.5 13.04H7.5V2.04004C7.5 1.77482 7.39464 1.52047 7.20711 1.33293C7.01957 1.1454 6.76522 1.04004 6.5 1.04004H2.5C2.23478 1.04004 1.98043 1.1454 1.79289 1.33293C1.60536 1.52047 1.5 1.77482 1.5 2.04004V19.04H18.5C18.7652 19.04 19.0196 18.9347 19.2071 18.7471C19.3946 18.5596 19.5 18.3053 19.5 18.04V14.04C19.5 13.7748 19.3946 13.5205 19.2071 13.3329C19.0196 13.1454 18.7652 13.04 18.5 13.04Z"
          stroke="#1A6DFF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_600_769">
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
