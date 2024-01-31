import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const AddPage: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M2.77039 9.99992V1.38325C2.77039 1.23738 2.82833 1.09749 2.93148 0.994343C3.03462 0.891198 3.17452 0.833252 3.32039 0.833252H14.0014C14.1472 0.83338 14.287 0.891411 14.3901 0.994585L17.2757 3.88025C17.327 3.93149 17.3677 3.99237 17.3954 4.05939C17.4231 4.12641 17.4372 4.19824 17.4371 4.27075V18.6166C17.4371 18.6888 17.4228 18.7603 17.3952 18.8271C17.3675 18.8938 17.327 18.9544 17.276 19.0055C17.2249 19.0566 17.1643 19.0971 17.0975 19.1247C17.0308 19.1524 16.9593 19.1666 16.8871 19.1666H9.18705"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7704 0.833252V3.94992C13.7704 4.09579 13.8284 4.23568 13.9315 4.33883C14.0347 4.44197 14.1745 4.49992 14.3204 4.49992H17.4371M0.929749 16.4166H3.67975M3.67975 16.4166H6.42975M3.67975 16.4166V13.6666M3.67975 16.4166V19.1666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};