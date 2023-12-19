import { Avatar, Modal, ModalContent, ModalProps } from '@nextui-org/react';
import React from 'react';
import {
  ArchiveBox,
  Clock,
  CodeBracket,
  Download,
  Duplicate,
  File,
  Help,
  Pencil,
  Play,
  Ruler,
  Search,
  Setting,
  Share,
  ShoppingCart,
  User,
} from '@/app/icons';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';

interface MoreModalProps extends Omit<ModalProps, 'children'> {}

export const MoreModal: React.FC<MoreModalProps> = ({ ...props }) => {
  return (
    <>
      <Modal
        {...props}
        className={twMerge(
          clsx(props.className),
          'duration-50 !w-full max-w-full !mx-0 !my-0 !max-h-[85%] overflow-y-auto ',
        )}
        classNames={{ wrapper: '!items-end ' }}
        hideCloseButton
      >
        <ModalContent className="m-0 rounded-b-none">
          <div className="py-2 ">
            <div className="px-5 py-2 ">
              <div className="flex items-center gap-[11px]">
                <div>
                  <User className="w-[40px] h-[40px] " />
                </div>
                <div>
                  <p className="text-md font-normal text-back-500 font-[500] leading-xl">
                    Please enter a title
                  </p>
                  <p className="text-gray-200 text-[13px]">1080px x 1080px</p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-border my-2"></div>

            <div className="px-4">
              <div className="flex gap-[12px] items-center py-[10px]">
                <File className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Create new design</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Duplicate className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Create copy</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <ArchiveBox className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Save</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-border my-2"></div>

            <div className="px-4">
              <div className="flex gap-[12px] items-center py-[10px]">
                <ShoppingCart className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Print your design</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Download className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Download</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Share className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Share</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-border my-2"></div>

            <div className="px-4">
              <div className="flex gap-[12px] items-center py-[10px]">
                <Ruler className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Adjust size</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Pencil className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Change mode</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Clock className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Work history</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Search className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Find and replace</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Play className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Slide show</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-border my-2"></div>

            <div className="px-4">
              <div className="flex gap-[12px] items-center py-[10px]">
                <Setting className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Settings</p>
              </div>
              <div className="flex gap-[12px] items-center py-[10px]">
                <Help className="w-[20px] h-[20px]" />
                <p className="text-md font-normal ">Help</p>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
