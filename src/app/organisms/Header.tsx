'use client';

import { FC, useState } from 'react';
import {
  ArchiveBoxArrowDown,
  ArrowUTurnLeft,
  ArrowUTurnRight,
  ChevronDown,
  ChevronLeft,
  DotsHorizontal,
  Download,
  Home,
  Share,
  ShoppingCart,
  UploadIcon,
} from '../icons';
import Link from 'next/link';
import { Modal, ModalContent } from '@nextui-org/react';
import { UploadModal } from '../molecules/UploadModal';
import { MoreModal } from '../molecules/MoreModal';
import useMediaQuery from '../hooks/useMediaQuery';
import { UploadPopover } from '../molecules/UploadPopover';
import clsx from 'clsx';

export const Header: FC = () => {
  const [openModal, setOpenModal] = useState<
    null | 'upload-modal' | 'more-modal'
  >(null);

  const isMobile = useMediaQuery('mobile');

  return (
    <>
      <header className="flex items-center justify-between px-[10px] h-[48px] shadow-sm py-2 desktop:shadow-md">
        <div className="flex items-center gap-4 h-full">
          <Link
            href={'/workspace'}
            className={clsx(
              'flex items-center w-[58px]  justify-center text-icon-gray text-[24px] ',
              'duration-100 hover:text-primary',
            )}
          >
            <ChevronLeft
              className={clsx('hidden   w-[20px] h-[20px] desktop:block')}
            />
            <Home className={clsx('text-[20px] w-[20px] h-[20px]')} />
          </Link>

          <div className="hidden desktop:flex items-center gap-4 h-full">
            <button className="h-full">
              <p
                className={clsx(
                  'font-normal text-md text-gray-400 ',
                  'duration-100 hover:text-primary',
                )}
              >
                File
              </p>
            </button>
            <button
              className={clsx(
                'font-normal text-md  text-gray-400 h-full min-w-[50px] ',
                'duration-100 hover:text-primary',
              )}
            >
              <p>Settings</p>
            </button>
            <button
              className={clsx(
                'font-normal text-md text-gray-400 h-full min-w-[50px] flex items-center',
                'duration-100 hover:text-primary',
              )}
            >
              <p>1080px x 1080px</p>{' '}
              <ChevronDown className="text-gray-200 w-[28px] h-[18px]" />
            </button>
          </div>

          <div className="flex items-center">
            <button className="p-[4px] h-[40px] w-[40px] flex justify-center items-center">
              <ArrowUTurnLeft
                className={clsx(
                  'w-[20px] h-[20px] text-icon-light-gray',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
            <button className="p-[4px] h-[40px] w-[40px] flex justify-center items-center">
              <ArrowUTurnRight
                className={clsx(
                  'w-[20px] h-[20px] text-icon-light-gray scale-y-[-1]',
                  'duration-100 hover:text-primary',
                )}
              />
            </button>
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