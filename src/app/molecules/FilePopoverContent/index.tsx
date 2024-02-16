import React, { useState } from 'react';
import { ChevronLeft } from '@/app/icons';
import { MenuGroup } from '../../atoms/MenuGroup';
import { MenuItem } from '../../atoms/MenuItem';
import { FilePopoverContentCommon } from './FilePopoverContentCommon';
import { BackgroundSizeSetting } from '../BackgroundSizeSetting';

export type FileContentActive =
  | 'request'
  | 'editPc'
  | 'load'
  | 'edit'
  | 'common';

export const FilePopoverContent: React.FC = () => {
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [fileContentActive, setFileContentActive] =
    useState<FileContentActive>('common');

  return (
    <div className="h-full min-h-[70vh] overflow-auto w-full">
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
              <p className="text-default5 font-normal text-smd leading-4.5">
                Are you looking for “A4” size?
              </p>{' '}
            </MenuItem>
          </MenuGroup>
          <BackgroundSizeSetting />
        </>
      )}
    </div>
  );
};
