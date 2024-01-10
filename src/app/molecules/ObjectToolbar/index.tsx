'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../../atoms/IconButton';
interface ObjectToolbarProps extends HTMLAttributes<HTMLDivElement> {}

export const ObjectToolbar = forwardRef<HTMLDivElement, ObjectToolbarProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={twMerge('flex gap-3', props.className)}
      >
        <IconButton>Copy</IconButton>
        <IconButton>Delete</IconButton>
        {/* TODO: Add dropdown later, too hard to find a suitable menu library */}
        <IconButton>Dots</IconButton>
      </div>
    );
  },
);

ObjectToolbar.displayName = 'ObjectToolbar';
