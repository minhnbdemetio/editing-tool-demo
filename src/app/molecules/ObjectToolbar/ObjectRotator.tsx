import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../../atoms/IconButton';
import { useRotateActiveObject } from '@/app/hooks/active-object/useActiveObject';

interface ObjectRotatorProps extends HTMLAttributes<HTMLDivElement> {}

export const ObjectRotator = forwardRef<HTMLDivElement, ObjectRotatorProps>(
  (props, ref) => {
    const handleRotateObject = useRotateActiveObject('counterclockwise');

    return (
      <div ref={ref} className={twMerge('flex', props.className)} {...props}>
        <IconButton onClick={handleRotateObject}>Rotate</IconButton>
      </div>
    );
  },
);

ObjectRotator.displayName = 'ObjectToolbar';
