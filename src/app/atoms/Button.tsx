import { FC } from 'react';
import {
  Button as NextButton,
  ButtonProps,
  extendVariants,
} from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

const CustomButton = extendVariants(NextButton, {
  variants: {
    // <- modify/add variants
    color: {
      primary: 'text-default1 bg-primary1',
      secondary:
        'text-primary1 bg-default1 border border-solid border-primary1 hover:bg-primary1-hover hover:text-default1',
      default: 'text-primary1 bg-default3 hover:bg-default4',
      danger: 'text-default1 bg-error hover:bg-error-hover',
      success: 'text-default1 bg-success hover:bg-success-hover',
      warning: 'text-default1 bg-warning hover:bg-warning-hover',
    },
    isDisabled: {
      true: 'opacity-40 cursor-not-allowed',
    },
    size: {
      xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
      md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
      xl: 'px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium',
    },
  },
  defaultVariants: {
    primary: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'primary',
    },
  ],
});

export const Button: FC<ButtonProps> = props => {
  return <CustomButton {...props} className={twMerge('', props.className)} />;
};
