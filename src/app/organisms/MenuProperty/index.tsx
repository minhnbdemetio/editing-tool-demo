import { FC } from 'react';
import clsx from 'clsx';
import { PhotoMenuProperty } from './PhotoMenuProperty';
import { useActiveObject } from '@/app/store/active-object';
import { CopyStyle, FullLock, Information, Link } from '@/app/icons';
import { Tabs, Tab } from '@nextui-org/react';
import { TextMenuProperty } from './TextMenuProperty';

interface MenuPropertyProps {
  menuExpand: boolean;
}

export const MenuProperty: FC<MenuPropertyProps> = ({ menuExpand }) => {
  const { activeObject } = useActiveObject();

  const renderMenuPropertyComponent = () => {
    switch (activeObject?.type) {
      case 'i-text': {
        return <TextMenuProperty />;
      }

      default: {
        return <PhotoMenuProperty />;
      }
    }
  };

  return (
    <div
      className={clsx(
        'z-20 w-full h-full rounded-t-xl  bg-white',
        {
          hidden: menuExpand,
        },
        'desktop:relative desktop:left-0 desktop:rounded-t-none desktop:w-[360px]',
      )}
    >
      <div className="w-full h-full p-6">
        <div className="w-full h-12 flex flex-row items-center px-4 justify-between gap-3 bg-[rgb(90,101,118,0.09)] rounded-md">
          <span className="text-sm">Photo</span>
          <div className="flex flex-row gap-2">
            <div className="w-8 h-8 rounded-md cursor-pointer hover:bg-[#e5e6e8] flex justify-between items-center">
              <CopyStyle className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 rounded-md cursor-pointer hover:bg-[#e5e6e8] flex justify-between items-center">
              <FullLock className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 rounded-md cursor-pointer hover:bg-[#e5e6e8] flex justify-between items-center">
              <Link className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 rounded-md cursor-pointer hover:bg-[#e5e6e8] flex justify-between items-center">
              <Information className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Tabs className="mt-3" aria-label="Options">
            <Tab key="property" title="Property">
              {renderMenuPropertyComponent()}
            </Tab>
            <Tab key="animate" title="Animate"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
