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
    <div className="py-2 w-full">
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <ShoppingCart className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Print your design</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <Download className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Download</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <Share className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Share</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <Play className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">View slide show</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <CodeBracket className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Insert</p>
      </div>
      <div className="flex gap-[12px] items-center py-[10px] hover:bg-gray-200 px-4 cursor-pointer">
        <ViewColumns className="w-[20px] h-[20px]" />
        <p className="text-[13px] font-normal ">Create template</p>
      </div>
    </div>
  );
};
