import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Page: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <rect
        x="7.5"
        y="7.5"
        width="20.625"
        height="30"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M36.4738 14.4645L28.125 12.1875V36.375L29.9446 36.9209C31.0083 37.24 32.1284 36.6314 32.4393 35.5652L37.8676 16.954C38.1807 15.8804 37.5527 14.7587 36.4738 14.4645Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};
