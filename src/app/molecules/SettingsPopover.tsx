import {
  Modal,
  ModalContent,
  ModalProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { MenuGroup } from '../atoms/MenuGroup';
import { MenuItem } from '../atoms/MenuItem';
import { ChevronRight, Close } from '../icons';

interface SettingsPopoverProps extends Omit<ModalProps, 'children'> {}

export const SettingsPopover: React.FC<SettingsPopoverProps> = ({
  ...props
}) => {
  const [submenu, setSubmenu] = useState<
    null | 'guidelines' | 'configurations' | 'page_numbers'
  >();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-start"
        offset={10}
      >
        <PopoverTrigger>
          <button
            className={clsx(
              'font-normal text-md  text-gray-400 h-full min-w-[50px] ',
              'duration-100 hover:text-primary',
            )}
          >
            <p>Settings</p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[320px] upload-popover rounded-md px-0">
          <div className="w-full">
            <MenuGroup>
              <MenuItem
                onEndIconClick={() => setIsOpen(false)}
                endIcon={Close}
                hover={false}
              >
                <p className="font-normal text-[17px] text-black-500 ">
                  Settings
                </p>
              </MenuItem>
            </MenuGroup>

            <MenuGroup>
              <MenuItem>
                <div className="flex justify-between items-center w-full">
                  <p className="font-normal text-md text-black-500">
                    Dark mode
                  </p>

                  <Switch
                    classNames={{
                      wrapper:
                        'group-data-[selected=true]:!bg-green-500 h-[24px]',
                      base: 'h-[24px]',
                    }}
                    aria-label="Dark mode"
                  />
                </div>
              </MenuItem>
            </MenuGroup>

            <MenuGroup>
              <MenuItem>
                <div className="flex justify-between items-center w-full">
                  <p className="font-normal text-md text-black-500">Layers</p>

                  <Switch
                    classNames={{
                      wrapper:
                        'group-data-[selected=true]:!bg-green-500 h-[24px]',
                      base: 'h-[24px]',
                    }}
                    aria-label="Layers"
                  />
                </div>
              </MenuItem>
            </MenuGroup>

            <MenuGroup>
              <MenuItem>
                <div className="flex justify-between items-center w-full">
                  <p className="font-normal text-md text-black-500">
                    Show rulers
                  </p>

                  <Switch
                    classNames={{
                      wrapper:
                        'group-data-[selected=true]:!bg-green-500 h-[24px]',
                      base: 'h-[24px]',
                    }}
                    aria-label="Show rulers"
                  />
                </div>
              </MenuItem>

              <MenuItem
                onClick={() => setSubmenu('guidelines')}
                endIcon={ChevronRight}
              >
                <p className="font-normal text-md text-black-500">Guidelines</p>
              </MenuItem>

              <MenuItem
                onClick={() => setSubmenu('configurations')}
                endIcon={ChevronRight}
              >
                <p className="font-normal text-md text-black-500">
                  Configurations
                </p>
              </MenuItem>
            </MenuGroup>

            <MenuGroup>
              <MenuItem
                onClick={() => setSubmenu('page_numbers')}
                endIcon={ChevronRight}
              >
                <p className="font-normal text-md text-black-500">
                  Page numbers
                </p>
              </MenuItem>
            </MenuGroup>

            <MenuGroup divider={false}>
              <MenuItem>
                <div className="flex justify-between items-center w-full">
                  <p className="font-normal text-md text-black-500">Autosave</p>

                  <Switch
                    classNames={{
                      wrapper:
                        'group-data-[selected=true]:!bg-green-500 h-[24px]',
                      base: 'h-[24px]',
                    }}
                    aria-label="Layers"
                  />
                </div>
              </MenuItem>
            </MenuGroup>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
