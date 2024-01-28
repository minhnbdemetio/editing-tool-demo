'use client';

import { FC, useState } from 'react';
import {
  ArchiveBoxArrowDown,
  ArrowUTurnLeft,
  ArrowUTurnRight,
  ChevronLeft,
  DotsHorizontal,
  Download,
  ShoppingCart,
  UploadIcon,
} from '@/app/icons';
import Link from 'next/link';
import { UploadModal } from '../molecules/UploadModal';
import { MoreModal } from '../molecules/MoreModal';
import useMediaQuery from '../store/useMediaQuery';
import { UploadPopover } from '../molecules/UploadPopover';
import clsx from 'clsx';
import { FilePopover } from '../molecules/FilePopover';
import { EditableTextField } from '../atoms/EditableTextField';
import Image from 'next/image';

import { SettingsPopover } from '../molecules/SettingsPopover';
import { BackgroundSizePopover } from '../molecules/BackgroundSizePopover';
import {
  useRedoCommand,
  useUndoCommand,
} from '../hooks/editor-commands/useCommand';

export const Header: FC = () => {
  const [openModal, setOpenModal] = useState<
    null | 'upload-modal' | 'more-modal'
  >(null);

  const isMobile = useMediaQuery(s => s.device === 'mobile');

  const undoCommand = useUndoCommand();
  const redoCommand = useRedoCommand();

  return (
    <>
      <header className="flex items-center justify-between px-[20px] h-[48px] desktop:h-[60px]  shadow-sm py-2 desktop:shadow-md">
        <div className="flex items-center gap-4 h-full">
          <Link
            href={'/workspace'}
            className={clsx(
              'flex items-center w-fit  justify-center text-icon-gray text-[24px] ',
              'duration-100 hover:text-primary',
            )}
          >
            <ChevronLeft
              className={clsx('hidden   w-[20px] h-[20px] desktop:block')}
            />
            <Image src={'/AppLogo.png'} width={70} height={23} alt="AppLogo" />
          </Link>

          <div className="hidden desktop:flex items-center gap-4 h-full">
            <FilePopover />
            <SettingsPopover />
            <BackgroundSizePopover />
          </div>

          <div className="flex items-center">
            <button
              onClick={undoCommand}
              className="p-[4px] h-[40px] w-[40px] flex justify-center items-center"
            >
              <ArrowUTurnLeft
                className={clsx(
                  'w-[20px] h-[20px] text-icon-light-gray',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
            <button
              onClick={redoCommand}
              className="p-[4px] h-[40px] w-[40px] flex justify-center items-center"
            >
              <ArrowUTurnRight
                className={clsx(
                  'w-[20px] h-[20px] text-icon-light-gray scale-y-[-1]',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>

            <div className="hidden desktop:block">
              <EditableTextField fallbackValue="Please enter a title" />
            </div>
          </div>
        </div>
        <div className=" flex items-center h-full">
          <div className="hidden desktop:flex h-full items-center gap-2 ">
            <button className="h-full  px-3 border-[1px] border-border border-solid rounded-md">
              <ArchiveBoxArrowDown
                className={clsx(
                  'w-[20px] h-[20px] text-black-500',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
            <button className="h-full  px-3 text-md font-normal border-green-500 text-primary border-[1px] border-solid rounded-md">
              <p>Share</p>
            </button>
            <button className="h-full flex items-center gap-2 bg-gradientBtnLeft  text-md font-normal p-3 rounded-md text-primaryContrast">
              <Download className="w-[20px] h-[20px]" />
              <p>Download</p>
            </button>
            <div className="flex items-center bg-gradientBtnRight text-primaryContrast h-full  rounded-md ">
              <button className="flex h-full items-center gap-2  text-md font-normal p-4 border-r-[1px] border-r-white">
                <ShoppingCart className="w-[20px] h-[20px]" />
                <p>Print your design</p>
              </button>
              {isMobile ? (
                <button className=" h-full p-3">
                  <DotsHorizontal className="w-[20px] h-[20px]" />
                </button>
              ) : (
                <UploadPopover />
              )}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center desktop:hidden">
            <button
              onClick={() => setOpenModal('more-modal')}
              className="w-[40px] h-full flex justify-center items-center"
            >
              <DotsHorizontal className="w-[22px] h-[22px] text-icon-bold" />
            </button>
            <button
              onClick={() => setOpenModal('upload-modal')}
              className="w-[40px] h-full flex justify-center items-center"
            >
              <UploadIcon className="w-[22px] h-[22px] text-icon-bold" />
            </button>
          </div>
        </div>
      </header>

      {isMobile && (
        <>
          <UploadModal
            onClose={() => setOpenModal(null)}
            isOpen={openModal === 'upload-modal'}
          />
          <MoreModal
            onClose={() => setOpenModal(null)}
            isOpen={openModal === 'more-modal'}
          />
        </>
      )}
    </>
  );
};
