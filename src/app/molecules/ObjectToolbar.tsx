import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../atoms/IconButton';

interface ObjectToolbarProps extends HTMLAttributes<HTMLDivElement> {
  className: string;
}

export const ObjectToolbar: FC<ObjectToolbarProps> = ({
  className,
  ...rest
}) => {
  return (
    <div className={twMerge('flex', className)} {...rest}>
      <IconButton>Copy</IconButton>
      <IconButton>Delete</IconButton>
      <IconButton>Dots</IconButton>
    </div>
  );
};
