import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import { TemplateFilters } from './TemplateFilters';

interface TemplateFilterModalProps {
  open: boolean;
  onClose: () => void;
}

export const TemplateFilterModal: React.FC<TemplateFilterModalProps> = ({
  onClose,
  open,
}) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={open}
      onClose={onClose}
      hideCloseButton
      className="!mx-0 !my-0 rounded-b-none desktop:hidden"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 desktop:hidden',
      }}
    >
      <ModalContent className="desktop:hidden ">
        {onClose => (
          <>
            <ModalHeader className="flex flex-row gap-1 justify-between w-full">
              <p className="text-[16px] font-normal text-black-500">
                All filters
              </p>
              <button className="text-md font-normal text-primary ">
                Done
              </button>
            </ModalHeader>
            <ModalBody>
              <TemplateFilters />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
