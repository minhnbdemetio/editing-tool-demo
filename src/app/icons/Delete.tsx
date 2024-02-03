import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const Delete: React.FC<IconProps> = ({ className }) => {
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
        d="M8.81207 14.6665L8.81207 11.9165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.3954 14.6665L13.3954 11.9165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.47876 5.5H20.7288V5.5C19.6008 5.5 19.0368 5.5 18.6066 5.72097C18.2349 5.9119 17.9323 6.21448 17.7414 6.58619C17.5204 7.01638 17.5204 7.58036 17.5204 8.70833V16.1667C17.5204 18.0523 17.5204 18.9951 16.9346 19.5809C16.3489 20.1667 15.406 20.1667 13.5204 20.1667H8.68709C6.80147 20.1667 5.85867 20.1667 5.27288 19.5809C4.68709 18.9951 4.68709 18.0523 4.68709 16.1667V8.70834C4.68709 7.58037 4.68709 7.01638 4.46612 6.58619C4.27519 6.21448 3.97262 5.9119 3.6009 5.72097C3.17071 5.5 2.60673 5.5 1.47876 5.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.8902 2.17296C9.02077 2.0755 9.30847 1.98939 9.7087 1.92797C10.1089 1.86654 10.5993 1.83325 11.1038 1.83325C11.6083 1.83325 12.0986 1.86654 12.4989 1.92796C12.8991 1.98939 13.1868 2.0755 13.3174 2.17296"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
