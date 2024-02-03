import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import { ModalType } from './DownloadMenu';

interface Props extends Omit<ModalProps, 'children'> {
  setActiveModal: (type: ModalType) => void;
}

export const DownloadMenuDialog = ({
  className,
  setActiveModal,
  ...props
}: Props) => {
  return (
    <Modal
      placement="center"
      classNames={{
        wrapper: 'items-center',
      }}
      hideCloseButton
      {...props}
    >
      <ModalContent className="rounded-[20px] max-w-[89%] items-center">
        {onClose => (
          <>
            <ModalHeader className="text-sml leading-[27px] pt-4 pb-6">
              Would you like to?
            </ModalHeader>
            <ModalBody className="text-smd leading-4.5 pt-0 pb-9 w-full">
              <Button
                color="primary"
                className="rounded-lg block"
                onClick={onClose}
              >
                Add to cart
              </Button>
              <Button
                color="primary"
                className="rounded-lg block"
                onClick={onClose}
              >
                Make payment
              </Button>
              <Button
                color="primary"
                className="rounded-lg block"
                onClick={() => setActiveModal(ModalType.DOWNLOAD)}
              >
                Download
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
