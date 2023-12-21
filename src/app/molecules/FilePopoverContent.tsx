import React from 'react';
import {
  ArchiveBoxArrowDown,
  Clock,
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
import { MenuGroup } from '../atoms/MenuGroup';
import { MenuItem } from '../atoms/MenuItem';

export const FilePopoverContent: React.FC = () => {
  return (
    <div className=" h-full overflow-auto w-full">
      <MenuGroup>
        <MenuItem hover={false}>
          <div className="flex items-center gap-[11px]">
            <div>
              <User className="w-[40px] h-[40px] " />
            </div>
            <div>
              <EditableTextField fallbackValue="Please enter a title" />
              <p className="text-gray-200 text-[13px]">1080px x 1080px</p>
            </div>
          </div>
        </MenuItem>
      </MenuGroup>

      <MenuGroup>
        <MenuItem>
          <File className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Create new design</p>
        </MenuItem>
        <MenuItem>
          <Duplicate className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Create copy</p>
        </MenuItem>
        <MenuItem>
          <ArchiveBoxArrowDown className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Save</p>
        </MenuItem>
      </MenuGroup>

      <MenuGroup className="hidden desktop:block">
        <MenuItem>
          <ShoppingCart className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Print your design</p>
        </MenuItem>
        <MenuItem>
          <Clock className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Work history</p>
        </MenuItem>
        <MenuItem>
          <Search className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Find and replace</p>
        </MenuItem>
        <MenuItem>
          <Play className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Slide show</p>
        </MenuItem>
      </MenuGroup>

      <MenuGroup className="desktop:hidden">
        <MenuItem>
          <ShoppingCart className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Print your design</p>
        </MenuItem>
        <MenuItem className="desktop:hidden">
          <Download className="w-[20px] h-[20px]" />
          <p className="text-md font-normal desktop:hidden">Download</p>
        </MenuItem>
        <MenuItem className="desktop:hidden">
          <Share className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Share</p>
        </MenuItem>
      </MenuGroup>

      <MenuGroup className="desktop:hidden">
        <MenuItem>
          <Ruler className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Adjust size</p>
        </MenuItem>
        <MenuItem>
          <Pencil className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Change mode</p>
        </MenuItem>
        <MenuItem>
          <Clock className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Work history</p>
        </MenuItem>
        <MenuItem>
          <Search className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Find and replace</p>
        </MenuItem>
        <MenuItem>
          <Play className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Slide show</p>
        </MenuItem>
      </MenuGroup>

      <MenuGroup divider={false}>
        <MenuItem className="desktop:hidden">
          <Setting className="w-[20px] h-[20px]" />
          <p className="text-md font-normal ">Settings</p>
        </MenuItem>
        <MenuItem>
          <Help className="w-[20px] h-[20px] " />
          <p className="text-md font-normal ">Help</p>
        </MenuItem>
      </MenuGroup>
    </div>
  );
};
