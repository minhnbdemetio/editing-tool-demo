import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { UploadPopoverContent } from './UploadPopoverContent';
import { DotsHorizontal } from '../icons';
import { FilePopoverContent } from './FilePopoverContent';
import clsx from 'clsx';

interface FilePopoverProps {}

export const FilePopover: React.FC<FilePopoverProps> = ({}) => {
  return (
    <>
      <Popover placement="bottom-start" className="rounded-sm" offset={10}>
        <PopoverTrigger>
          <button className="h-full">
            <p
              className={clsx(
                'font-normal text-md text-gray-400 ',
                'duration-100 hover:text-primary',
              )}
            >
              File
            </p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[320px] upload-popover rounded-md px-0">
          <FilePopoverContent />
        </PopoverContent>
      </Popover>
    </>
  );
};
