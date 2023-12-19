import { Modal, ModalContent, ModalProps } from '@nextui-org/react';
import React from 'react';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { UploadPopoverContent } from './UploadPopoverContent';

interface UploadModalProps extends Omit<ModalProps, 'children'> {}

export const UploadModal: React.FC<UploadModalProps> = ({ ...props }) => {
  return (
    <>
      <Modal
        {...props}
        className={twMerge(
          clsx(props.className),
          'duration-50 !w-full max-w-full !mx-0 !my-0 !max-h-[85%] ',
        )}
        classNames={{ wrapper: '!items-end' }}
        hideCloseButton
      >
        <ModalContent className="m-0 rounded-b-none">
          <UploadPopoverContent />
        </ModalContent>
      </Modal>
    </>
  );
};
