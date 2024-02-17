import { PdfFile } from '@/app/icons/PdfFile';
import { PngFile } from '@/app/icons/PngFile';
import { IconProps } from '@/app/types';
import { FC } from 'react';

export interface FileType {
  icon: FC<IconProps>;
  value: string;
  label: string;
  description: string;
}

export const FILE_TYPES = [
  {
    icon: PngFile,
    value: 'png',
    label: 'PNG',
    description: 'Best for complex images, illustrations',
  },
  {
    icon: PdfFile,
    value: 'pdf',
    label: 'PDF',
    description: 'Best for printing',
  },
];
