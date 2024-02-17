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

      <MenuGroup className="flex-1 overflow-y-auto border-default9/15 gap-6 flex flex-col pt-4 pb-6 border-b-0">
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

        <MenuItem className="py-0">
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

        <MenuItem className="py-0 grow items-start [&>div:first-child]:h-full [&>div:first-child]:items-start">
          <div className="w-full h-full flex flex-col gap-2 text-none">
            <div className="text-smm text-pirmaryGray leading-4 whitespace-pre-wrap">
              Guide
            </div>
            <div
              className={clsx(
                'w-full flex-1 border-default4 py-2.5 px-3.5 rounded-[10px] border-px',
                'text-md leading-5 whitespace-pre-wrap break-words text-default5',
              )}
              style={{ resize: 'none' }}
            >
              Placeholder
            </div>
          </div>
        </MenuItem>
      </MenuGroup>
    </>
  );
};
