import { ModalProps } from '@nextui-org/react';
import { useState } from 'react';
import { DownloadConfirmDialog } from './DownloadConfirmDialog';
import { DownloadMenuDialog } from '.';
import { DownloadDialog } from './DownloadDialog';

export const enum ModalType {
  CONFIRM = 'confirm',
  MENU = 'menu',
  DOWNLOAD = 'download',
}

interface Props extends Omit<ModalProps, 'children'> {
  isOpen?: boolean;
  onClose: () => void;
}

export const DownloadMenu = ({ isOpen, onClose, className }: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.CONFIRM);

  const handleClose = () => {
    setActiveModal(ModalType.CONFIRM);
    onClose();
  };

  return (
    <>
      <DownloadConfirmDialog
        onConfirm={() => setActiveModal(ModalType.MENU)}
        isOpen={isOpen && activeModal === ModalType.CONFIRM}
        onClose={handleClose}
      />

      <DownloadMenuDialog
        setActiveModal={setActiveModal}
        isOpen={isOpen && activeModal === ModalType.MENU}
        onClose={handleClose}
      />

      <DownloadDialog
        showActionMenu={() => setActiveModal(ModalType.MENU)}
        isOpen={isOpen && activeModal === ModalType.DOWNLOAD}
        onClose={handleClose}
      />
    </>
  );
};
