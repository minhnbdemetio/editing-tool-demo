import React, { useState } from 'react';
import { EditableTextField } from '../../atoms/EditableTextField';
import { MenuGroup } from '../../atoms/MenuGroup';
import { MenuItem } from '../../atoms/MenuItem';
import { Switch } from '@nextui-org/react';
import { FileContentActive } from '.';
import { FilePopoverAction } from './FilePopoverAction';
import { FILE_POPOVER_ITEMS } from './items';
import clsx from 'clsx';

interface FilePopoverContentCommonProps {
  setFileContentActive: (value: FileContentActive) => void;
}

export const FilePopoverContentCommon: React.FC<
  FilePopoverContentCommonProps
> = ({ setFileContentActive }) => {
  const [isPreview, setIsPreview] = useState<boolean>(true);
  return (
    <>
      <MenuGroup className="py-0">
        <MenuItem hover={false} className="pt-3 pb-3.5">
          <EditableTextField fallbackValue="Untitled" />
        </MenuItem>
      </MenuGroup>

      <MenuGroup className="border-default9/15 gap-6 flex flex-col pt-4 pb-6">
        {FILE_POPOVER_ITEMS.map(item => (
          <MenuItem key={item.id} className="py-0">
            <FilePopoverAction
              label={item.label}
              Icon={item.icon}
              actionLabel={item.actionLabel}
              onClick={() => setFileContentActive(item.id)}
            />
          </MenuItem>
        ))}

        <MenuItem>
          <div className="w-full flex gap-3 items-center justify-between">
            <div className="flex-1 text-smm text-pirmaryGray leading-4 whitespace-pre-wrap">
              Preview
            </div>
            <Switch
              isSelected={isPreview}
              onValueChange={value => {
                setIsPreview(value);
              }}
              classNames={{
                wrapper:
                  'group-data-[selected=true]:bg-lime-450 bg-black shadow-switch',
                thumb: 'bg-gradient-to-b from-white to-[#E8EAEA] shadow-thumb',
              }}
            ></Switch>
          </div>
        </MenuItem>

        <MenuItem>
          <div className="w-full space-y-2 text-none">
            <div className="flex-1 text-smm text-pirmaryGray leading-4 whitespace-pre-wrap">
              Guide
            </div>
            <textarea
              placeholder="Placeholder"
              className={clsx(
                'w-full border-default4 h-[271px] py-2.5 px-3.5 rounded-[10px] border-px',
                'text-md leading-5',
              )}
              style={{ resize: 'none' }}
            />
          </div>
        </MenuItem>
      </MenuGroup>
    </>
  );
};
