import { FC } from 'react';
import { Archive, Book, Open, Ruler1 } from '@/app/icons';
import { IconProps } from '@/app/types';
import { FileContentActive } from '.';

export interface FilePopoverItem {
  id: FileContentActive;
  label: string;
  actionLabel: string;
  icon: FC<IconProps>;
}

export const FILE_POPOVER_ITEMS: FilePopoverItem[] = [
  {
    id: 'request',
    label: `Request a design\nGo to the design request screen`,
    actionLabel: 'Request',
    icon: Book,
  },
  {
    id: 'editPc',
    label:
      'Save your work here! You can load previously worked content and continue working on it',
    actionLabel: 'Edit on PC',
    icon: Open,
  },
  {
    id: 'load',
    label: 'Open your saved work',
    actionLabel: 'Load',
    icon: Archive,
  },
  {
    id: 'edit',
    label: `Cutting size: 90mm x 50mm\nPrinting size: 94mm x 54mm`,
    actionLabel: 'Edit',
    icon: Ruler1,
  },
];
