'use client';

import { HTMLAttributes, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../../atoms/IconButton';
import {
  useCopyActiveObject,
  useDeleteActiveObject,
} from '@/app/hooks/useActiveObject';

interface ObjectToolbarProps extends HTMLAttributes<HTMLDivElement> {}

export const ObjectToolbar = forwardRef<HTMLDivElement, ObjectToolbarProps>(
  (props, ref) => {
    const handleCopyObject = useCopyActiveObject();

    const handleDeleteObject = useDeleteActiveObject();
    const [selectedOption, setSelectedOption] = useState(null);

    return (
      <div
        ref={ref}
        {...props}
        className={twMerge('flex gap-3', props.className)}
      >
        <IconButton onClick={handleCopyObject}>Copy</IconButton>
        <IconButton onClick={handleDeleteObject}>Delete</IconButton>
        {/* TODO: Add dropdown later, too hard to find a suitable menu library */}
        <IconButton>Dots</IconButton>
      </div>
    );
  },
);

ObjectToolbar.displayName = 'ObjectToolbar';
