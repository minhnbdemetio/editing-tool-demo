import { AddPage, Duplicate2, Delete, EyeSlash } from '@/app/icons';
import { Select } from '@/app/icons/Select';

export type PageMenuAction =
  | 'addPage'
  | 'duplicate'
  | 'delete'
  | 'hide'
  | 'select';

export declare type PageMenuItem = {
  key: PageMenuAction;
  icon: React.FC<{ className?: string }>;
  label: string;
};

export const PageMenuItems: PageMenuItem[] = [
  {
    key: 'addPage',
    icon: AddPage,
    label: 'Add Page',
  },
  {
    key: 'duplicate',
    icon: Duplicate2,
    label: 'Duplicate',
  },
  {
    key: 'delete',
    icon: Delete,
    label: 'Delete',
  },
  {
    key: 'select',
    icon: Select,
    label: 'Select',
  },
];
