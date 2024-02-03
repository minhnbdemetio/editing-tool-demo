import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Select: React.FC<IconProps> = ({ className }) => {
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
        d="M2.85376 8.25V17.7833C2.85376 18.2967 2.85376 18.5533 2.95368 18.7495C3.04156 18.922 3.18179 19.0622 3.35426 19.1501C3.55043 19.25 3.80709 19.25 4.31859 19.25H13.8538M6.52043 12.65V5.68333C6.52043 4.65667 6.52043 4.14333 6.72026 3.751C6.89626 3.40542 7.17584 3.12583 7.52143 2.94983C7.91376 2.75 8.42709 2.75 9.45376 2.75H16.4204C17.4471 2.75 17.9604 2.75 18.3528 2.94983C18.6977 3.1256 18.9782 3.40605 19.1539 3.751C19.3538 4.14333 19.3538 4.65667 19.3538 5.68333V12.65C19.3538 13.6767 19.3538 14.19 19.1539 14.5823C18.9781 14.9272 18.6977 15.2077 18.3528 15.3835C17.9604 15.5833 17.4489 15.5833 16.4241 15.5833H9.45101C8.42618 15.5833 7.91284 15.5833 7.52143 15.3835C7.17648 15.2077 6.89602 14.9273 6.72026 14.5823C6.52043 14.19 6.52043 13.6767 6.52043 12.65Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.7371 9.46267L12.0012 10.9064C12.0284 10.9372 12.0621 10.9615 12.0999 10.9775C12.1377 10.9935 12.1786 11.0008 12.2196 10.9988C12.2606 10.9969 12.3007 10.9858 12.3368 10.9663C12.3729 10.9468 12.4042 10.9195 12.4284 10.8863L14.995 7.33325"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
