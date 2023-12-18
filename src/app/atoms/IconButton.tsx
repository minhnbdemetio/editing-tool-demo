import { FC } from 'react';
import { Button as NextButton, ButtonProps } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

export const IconButton: FC<ButtonProps> = props => {
  return (
    <NextButton
      {...props}
      isIconOnly
      className={twMerge('bg-transparent', props.className)}
    />
  );
};
