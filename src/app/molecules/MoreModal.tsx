import { Modal, ModalContent, ModalProps } from '@nextui-org/react';
import React from 'react';

import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { FilePopoverContent } from './FilePopoverContent';
import { Backdrop } from '../atoms/Backdrop';
import { BottomSheet } from './BottomSheet';

interface MoreModalProps extends Omit<ModalProps, 'children'> {}

export const MoreModal: React.FC<MoreModalProps> = props => {
  return (
    <BottomSheet {...props}>
      <FilePopoverContent />
    </BottomSheet>
  );
};
