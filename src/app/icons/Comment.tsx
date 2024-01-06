import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Comment: React.FC<IconProps> = ({ className }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.996 14.696c.003.1.004.202.004.304 0 5.68-4.581 10.288-10.25 10.333-.022.01-.058.026-.11.055-.148.08-.345.208-.585.384-.477.352-1.043.833-1.598 1.33-.551.494-1.074.987-1.462 1.357l-.194.186c-.11.103-.203.193-.276.262a7.69 7.69 0 0 1-.15.139 1.669 1.669 0 0 1-.09.075h-.001c-.012.01-.074.058-.158.101h-.001a1.006 1.006 0 0 1-1.168-.182 1 1 0 0 1-.292-.707v-3.02C7.269 24.967 3 20.482 3 15 3 9.293 7.626 4.667 13.333 4.667h5.334c.264 0 .525.01.784.03a7.281 7.281 0 0 0-.664 1.97h-5.454a8.333 8.333 0 1 0 0 16.666h1.332v2.695c.148-.137.302-.276.457-.416a24.946 24.946 0 0 1 1.747-1.45c.276-.203.556-.392.82-.534.22-.12.584-.295.978-.295a8.333 8.333 0 0 0 8.329-8.067 7.283 7.283 0 0 0 2-.57Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 11.667a1 1 0 1 0 2 0V9h2.666a1 1 0 1 0 0-2H27V4.333a1 1 0 1 0-2 0V7h-2.667a1 1 0 1 0 0 2H25v2.667Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
