import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../../atoms/IconButton';

interface ObjectRotatorProps extends HTMLAttributes<HTMLDivElement> {}

export const ObjectRotator = forwardRef<HTMLDivElement, ObjectRotatorProps>(
  (props, ref) => {
    return (
      <div ref={ref} className={twMerge('flex ', props.className)} {...props}>
        <IconButton className="">Rotate</IconButton>
      </div>
    );
  },
);

ObjectRotator.displayName = 'ObjectToolbar';
