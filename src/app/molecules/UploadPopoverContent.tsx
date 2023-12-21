import React from 'react';
import {
  CodeBracket,
  Download,
  Play,
  Share,
  ShoppingCart,
  ViewColumns,
} from '../icons';
import { MenuItem } from '../atoms/MenuItem';

interface UploadPopoverContentProps {}

export const UploadPopoverContent: React.FC<UploadPopoverContentProps> = () => {
  return (
    <div className="py-2 w-full">
      <MenuItem>
        <ShoppingCart className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Print your design</p>
      </MenuItem>
      <MenuItem>
        <Download className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Download</p>
      </MenuItem>
      <MenuItem>
        <Share className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Share</p>
      </MenuItem>
      <MenuItem>
        <Play className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">View slide show</p>
      </MenuItem>
      <MenuItem>
        <CodeBracket className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Insert</p>
      </MenuItem>
      <MenuItem>
        <ViewColumns className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Create template</p>
      </MenuItem>
    </div>
  );
};
