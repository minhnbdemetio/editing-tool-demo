import { ModalProps } from '@nextui-org/react';
import { CenterModal } from '../../atoms/CenterModal';

interface Props extends Omit<ModalProps, 'children'> {
  onConfirm: () => void;
}

export const DownloadConfirmDialog = ({
  className,
  onConfirm,
  ...props
}: Props) => {
  return (
    <CenterModal
      hideCloseButton
      header="Confirmation"
      footer={
        <>
          <button className="pt-[13px] pb-[15px]" onClick={props.onClose}>
            Cancel
          </button>
          <button className="pt-[13px] pb-[15px]" onClick={onConfirm}>
            Confirm
          </button>
        </>
      }
      {...props}
    >
      Are you sure that you have finished?
    </CenterModal>
  );
};
