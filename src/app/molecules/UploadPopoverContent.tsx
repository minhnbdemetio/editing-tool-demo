import React from 'react';
import {
  CodeBracket,
  Download,
  Play,
  Share,
  ShoppingCart,
  ViewColumns,
} from '../icons';

interface UploadPopoverContentProps {}

export const UploadPopoverContent: React.FC<UploadPopoverContentProps> = () => {
  return (
    <div className="py-2 px-4 w-full">
      <div className="flex gap-[12px] items-center py-[10px]">
        <ShoppingCart className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Print your design</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px]">
        <Download className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Download</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px]">
        <Share className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Share</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px]">
        <Play className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">View slide show</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px]">
        <CodeBracket className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Insert</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px]">
        <ViewColumns className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Create template</p>
      </div>
    </div>
  );
};
