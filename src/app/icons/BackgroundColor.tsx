import { IconProps } from '../types';
import { twMerge } from '../utilities/tailwind';

export const BackgroundColor: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={twMerge('w-6 h-6', className)}
    >
      <rect width="22" height="22" rx="11" fill="url(#pattern0)" />
      <g filter="url(#filter0_d_668_8411)">
        <circle cx="11" cy="10.9999" r="3.85" fill="white" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_668_8411" transform="scale(0.0166667)" />
        </pattern>
        <filter
          id="filter0_d_668_8411"
          x="3.14999"
          y="3.1499"
          width="15.7"
          height="15.7002"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_668_8411"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_668_8411"
            result="shape"
          />
        </filter>
        <image
          id="image0_668_8411"
          width="60"
          height="60"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
