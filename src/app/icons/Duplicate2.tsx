import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Duplicate2: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-6 h-6', className)}
    >
      <path
        d="M17.5327 5.82349H8.29825C6.98878 5.82349 5.92725 6.88502 5.92725 8.19449V17.4289C5.92725 18.7384 6.98878 19.8 8.29825 19.8H17.5327C18.8422 19.8 19.9037 18.7384 19.9037 17.4289V8.19449C19.9037 6.88502 18.8422 5.82349 17.5327 5.82349Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.7763 5.65093L16.7979 4.61564C16.7961 3.97552 16.541 3.36214 16.0883 2.9095C15.6357 2.45687 15.0223 2.20177 14.3822 2.19995H5.06456C4.33302 2.20211 3.63206 2.49368 3.11478 3.01095C2.5975 3.52823 2.30593 4.2292 2.30377 4.96074V14.2784C2.30559 14.9185 2.56069 15.5319 3.01332 15.9845C3.46596 16.4372 4.07934 16.6922 4.71946 16.6941H5.75475M13.0018 9.44701V16.349M16.4528 12.898H9.55083"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
