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
          <MenuGroup>
            <MenuItem hover={false}>
              <button
                onClick={() => {
                  setFileContentActive('common');
                }}
              >
                <ChevronLeft className="w-4 h-4 cursor-pointer" />
              </button>
              <p className="text-default5 font-normal text-base leading-[140%]">
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
