import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';

interface Props extends Omit<ModalProps, 'children'> {
  onConfirm: () => void;
}

export const DownloadConfirmDialog = ({
  className,
  onConfirm,
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
      <ModalContent className="rounded-[20px] max-w-[89%]">
        {onClose => (
          <>
            <ModalHeader className="text-sml leading-[27px] pt-4 pb-2">
              Confirmation
            </ModalHeader>
            <ModalBody className="text-smd leading-4.5 pt-0 pb-6">
              Are you sure that you have finished?
            </ModalBody>
            <ModalFooter className="border-t border-t-default3 grid grid-cols-2 divide-x divide-default3 gap-0 py-0 text-primary1 text-md leading-[22px] font-medium">
              <button className="pt-[13px] pb-[15px]" onClick={onClose}>
                Cancel
              </button>
              <button className="pt-[13px] pb-[15px]" onClick={onConfirm}>
                Confirm
              </button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
