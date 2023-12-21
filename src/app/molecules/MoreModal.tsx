import { Avatar, Modal, ModalContent, ModalProps } from '@nextui-org/react';
import React from 'react';

import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { FilePopoverContent } from './FilePopoverContent';

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
          <FilePopoverContent />
        </ModalContent>
      </Modal>
    </>
  );
};
