import { FC } from 'react';
import { Button as NextButton, ButtonProps } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
export const Button: FC<ButtonProps> = props => {
  return <NextButton {...props} className={twMerge('', props.className)} />;
};
