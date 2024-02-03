import { Modal, ModalContent, ModalProps } from '@nextui-org/react';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Backdrop } from '../atoms/Backdrop';

interface Props extends PropsWithChildren<Omit<ModalProps, 'children'>> {
  hideBackdrop?: boolean;
  className?: string;
}

export const BottomSheet = ({
  hideBackdrop,
  className,
  children,
  ...props
}: Props) => {
  return (
    <Modal
      {...props}
      className={twMerge(
        clsx(className),
        'rounded-tr-2xl rounded-tl-2xl duration-50 !w-full max-w-full !mx-0 !my-0 !max-h-[85%] overflow-y-auto bg-white',
      )}
      classNames={{ wrapper: '!items-end ' }}
      hideCloseButton
    >
      {hideBackdrop ? null : <Backdrop />}
      <ModalContent className="m-0 rounded-b-none relative z-50 overflow-visible">
        <div className="absolute bg-white w-14 h-2.5 top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-[9px] border border-border" />
        {children}
      </ModalContent>
    </Modal>
  );
};
