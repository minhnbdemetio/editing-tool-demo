import React from 'react';
import {
  ArchiveBoxArrowDown,
  Clock,
  CodeBracket,
  Download,
  Duplicate,
  File,
  Help,
  Pencil,
  Play,
  Ruler,
  Search,
  Setting,
  Share,
  ShoppingCart,
  User,
} from '@/app/icons';
import { EditableTextField } from '../atoms/EditableTextField';
export const FilePopoverContent: React.FC = () => {
  return (
    <div className="py-2 w-full">
      <div className="px-5 py-2 ">
        <div className="flex items-center gap-[11px]">
          <div>
            <User className="w-[40px] h-[40px] " />
          </div>
          <div>
            <EditableTextField fallbackValue="Please enter a title" />
            <p className="text-gray-200 text-[13px]">1080px x 1080px</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-border my-2"></div>

      <div className="px-4">
        <div className="flex gap-[12px] items-center py-[10px]">
          <File className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Create new design</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <Duplicate className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Create copy</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <ArchiveBoxArrowDown className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Save</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-border my-2"></div>

      <div className="px-4">
        <div className="flex gap-[12px] items-center py-[10px]">
          <ShoppingCart className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Print your design</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px] desktop:hidden">
          <Download className="w-[20px] h-[20px]" />
          <p className="text-md font-normal desktop:hidden">Download</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px] desktop:hidden">
          <Share className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Share</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-border my-2 desktop:hidden"></div>

      <div className="px-4">
        <div className="flex gap-[12px] items-center py-[10px] desktop:hidden">
          <Ruler className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Adjust size</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px] desktop:hidden">
          <Pencil className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Change mode</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <Clock className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Work history</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <Search className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Find and replace</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <Play className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Slide show</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-border my-2"></div>

      <div className="px-4">
        <div className="flex gap-[12px] items-center py-[10px] desktop:hidden">
          <Setting className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Settings</p>
        </div>
        <div className="flex gap-[12px] items-center py-[10px]">
          <Help className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Help</p>
        </div>
      </div>
    </div>
  );
};
