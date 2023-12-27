import { CopyStyle, FullLock, Information, Link } from '@/app/icons';
import { FC, useState } from 'react';
import { PropertyTab } from './menuProperty';
import { twMerge } from '@/app/utilities/tailwind';

export const PhotoMenuProperty: FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyTab>(PropertyTab.Property);
  return (
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
      <div className="flex w-full">
        <div
          className={twMerge(
            'h-12 opacity-100 flex justify-center items-center cursor-pointer px-4 py-3 bg-[rgba(33, 175, 191, 0)] border-b-1 border-b-[rgba(90, 101, 119, 0.15)] flex-[1_1_0%]',
            {
              'border-b-[#26c7d9] border-b-2':
                activeTab === PropertyTab.Property,
            },
          )}
          onClick={() => {
            setActiveTab(PropertyTab.Property);
          }}
        >
          Property
        </div>
        <div
          className={twMerge(
            'h-12 opacity-100 flex justify-center items-center cursor-pointer px-4 py-3 bg-[rgba(33, 175, 191, 0)] border-b-1 border-b-[rgba(90, 101, 119, 0.15)] flex-[1_1_0%]',
            {
              'border-b-[#26c7d9] border-b-2':
                activeTab === PropertyTab.Animation,
            },
          )}
          onClick={() => {
            setActiveTab(PropertyTab.Animation);
          }}
        >
          Animation
        </div>
      </div>
    </div>
  );
};
