import React, { useState } from 'react';
import { ChevronLeft } from '@/app/icons';
import { MenuGroup } from '../../atoms/MenuGroup';
import { MenuItem } from '../../atoms/MenuItem';
import { FilePopoverContentCommon } from './FilePopoverContentCommon';
import { BackgroundSizeSetting } from '../BackgroundSizeSetting';
import { RequestDesignModal } from '../RequestDesignModal';
import { twMerge } from 'tailwind-merge';

export type FileContentActive =
  | 'request'
  | 'editPc'
  | 'load'
  | 'edit'
  | 'common';

interface Props {
  className?: string;
}

export const FilePopoverContent: React.FC<Props> = ({ className }) => {
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [fileContentActive, setFileContentActive] =
    useState<FileContentActive>('common');

  if (fileContentActive === 'request') {
    return (
      <RequestDesignModal
        isOpen={fileContentActive === 'request'}
        onClose={() => setFileContentActive('common')}
      />
    );
  }

  return (
    <div
      className={twMerge(
        'h-screen overflow-auto w-full flex flex-col',
        className,
      )}
    >
      {fileContentActive === 'common' && (
        <FilePopoverContentCommon setFileContentActive={setFileContentActive} />
      )}
      {fileContentActive === 'edit' && (
        <>
          <MenuGroup className="py-0">
            <MenuItem
              hover={false}
              className="flex items-center text-default11 py-3 border-default9/15"
            >
              <button
                onClick={() => {
                  setFileContentActive('common');
                }}
              >
                <ChevronLeft className="w-4 h-3 stroke-2" />
              </button>
            </MenuItem>
          </MenuGroup>
          <BackgroundSizeSetting />
        </>
      )}
    </div>
  );
};
