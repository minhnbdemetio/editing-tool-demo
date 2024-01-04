import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { UploadPopoverContent } from './UploadPopoverContent';
import { DotsHorizontal } from '../icons';

interface UploadPopoverProps {}

export const UploadPopover: React.FC<UploadPopoverProps> = ({}) => {
  return (
    <>
      <Popover placement="bottom" offset={10}>
        <PopoverTrigger>
          <button className=" p-3">
            <DotsHorizontal className="w-[20px] h-[20px]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[340px] upload-popover px-0">
          <UploadPopoverContent />
        </PopoverContent>
      </Popover>
    </>
  );
};
