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
} from '@/app/icons';
import Link from 'next/link';
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
import { DownloadMenu } from '../molecules/DownloadMenu/DownloadMenu';

export const Header: FC = () => {
  const [openModal, setOpenModal] = useState<
    null | 'download-modal' | 'more-modal'
  >(null);

  const isMobile = useMediaQuery(s => s.device === 'mobile');

  const undoCommand = useUndoCommand();
  const redoCommand = useRedoCommand();

  return (
    <>
      <header className="flex items-center justify-between px-[20px] h-[48px] desktop:h-[60px] py-2">
        <div className="flex items-center gap-3.5 h-full">
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

          <div className="flex items-center gap-4">
            <button onClick={undoCommand}>
              <ArrowUTurnLeft
                className={clsx(
                  'text-icon-light-gray',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
            <button onClick={redoCommand}>
              <ArrowUTurnRight
                className={clsx(
                  'text-icon-light-gray',
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
            <button className="h-full px-3 border-px border-border border-solid rounded-md">
              <ArchiveBoxArrowDown
                className={clsx(
                  'w-[20px] h-[20px] text-black-500',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
            <button className="h-full px-3 text-md font-normal border-green-500 text-primary border-px border-solid rounded-md">
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
          <div className="flex items-center gap-4 desktop:hidden">
            <button onClick={() => setOpenModal('more-modal')}>
              <DotsHorizontal className="w-8 h-8" />
            </button>
            <button onClick={() => setOpenModal('download-modal')}>
              <Download className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {isMobile && (
        <>
          <DownloadMenu
            onClose={() => setOpenModal(null)}
            isOpen={openModal === 'download-modal'}
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
