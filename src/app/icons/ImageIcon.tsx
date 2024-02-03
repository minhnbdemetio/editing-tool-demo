import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const ImageIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M18.931 16.8621H3.06897C1.92759 16.8621 1 15.9345 1 14.7931V3.06897C1 1.92759 1.92759 1 3.06897 1H18.931C20.0724 1 21 1.92759 21 3.06897V14.7931C21 15.9345 20.0724 16.8621 18.931 16.8621Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M1 12.2655L6.86207 6.86206L12.3793 12.3793L15.8276 9.62068L21 14.931"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="5.5" r="1.5" fill="currentColor" />
    </svg>
  );
};
