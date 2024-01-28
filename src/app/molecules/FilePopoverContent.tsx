import React, { useState } from 'react';
import { Archive, Book, Download, Open, Rule } from '@/app/icons';
import { EditableTextField } from '../atoms/EditableTextField';
import { MenuGroup } from '../atoms/MenuGroup';
import { MenuItem } from '../atoms/MenuItem';
import { Button } from '../atoms/Button';
import { Switch, Textarea } from '@nextui-org/react';

export const FilePopoverContent: React.FC = () => {
  const [isPreview, setIsPreview] = useState<boolean>(true);

  return (
    <div className=" h-full overflow-auto w-full">
      <MenuGroup>
        <MenuItem hover={false}>
          <EditableTextField fallbackValue="Please enter a title" />
        </MenuItem>
      </MenuGroup>

      <MenuGroup>
        <MenuItem>
          <div className="w-full flex gap-6 items-center justify-between">
            <div className="text-xs leading-[1.4]">
              Request a design Go to the design request screen
            </div>
            <Button
              color="secondary"
              className="min-w-[135px]"
              startContent={<Book />}
            >
              Request
            </Button>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="w-full flex gap-3 items-center justify-between">
            <div className="text-xs leading-[1.4]">
              Save your work here! You can load previously worked content and
              continue working on it
            </div>
            <Button
              color="secondary"
              className="min-w-[135px]"
              startContent={<Open />}
            >
              Edit on PC
            </Button>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="w-full flex gap-3 items-center justify-between">
            <div className="text-xs leading-[1.4]">Open your saved work</div>
            <Button
              color="secondary"
              className="min-w-[135px]"
              startContent={<Archive />}
            >
              Load
            </Button>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="w-full flex gap-3 items-center justify-between">
            <div className="text-xs leading-[1.4]">
              Cutting size: 90mm x 50mm Printing size: 94mm x 54mm
            </div>
            <Button
              color="secondary"
              className="min-w-[135px]"
              startContent={<Rule />}
            >
              Edit
            </Button>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="w-full flex gap-3 items-center justify-between">
            <div className="text-xs leading-[1.4]">Preview</div>
            <Switch
              isSelected={isPreview}
              onValueChange={value => {
                setIsPreview(value);
              }}
              classNames={{
                wrapper: 'group-data-[selected=true]:!bg-green-500 bg-black',
              }}
            ></Switch>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="w-full">
            <div className="text-xs leading-[1.4] w-full mb-3">Guide</div>
            <Textarea
              key={'bordered'}
              variant={'bordered'}
              placeholder="Placeholder"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              minRows={6}
            />
          </div>
        </MenuItem>
      </MenuGroup>
    </div>
  );
};
