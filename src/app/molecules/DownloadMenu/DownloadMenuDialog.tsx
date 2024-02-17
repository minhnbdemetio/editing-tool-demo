import { ModalType } from './DownloadMenu';
import { Cart } from '@/app/icons/Cart';
import { Wallet } from '@/app/icons/Wallet';
import { Download } from '@/app/icons';
import { Button } from '@/app/atoms/Button';
import { CenterModal, CenterModalProps } from '../../atoms/CenterModal';

interface Props extends Omit<CenterModalProps, 'children'> {
  setActiveModal: (type: ModalType) => void;
}

export const DownloadMenuDialog = ({
  className,
  setActiveModal,
  ...props
}: Props) => {
  return (
    <CenterModal
      header="Would you like to?"
      classes={{
        header: 'justify-center py-6',
        body: 'pb-8',
      }}
      {...props}
    >
      <Button
        color="primary"
        onClick={props.onClose}
        className="flex gap-2 font-medium"
      >
        <Cart />
        <span>Add to cart</span>
      </Button>
      <Button
        color="primary"
        className="flex gap-2 font-medium"
        onClick={props.onClose}
      >
        <Wallet />
        <span>Make payment</span>
      </Button>
      <Button
        color="primary"
        className="flex gap-2 font-medium"
        onClick={() => setActiveModal(ModalType.DOWNLOAD)}
      >
        <Download />
        <span>Download</span>
      </Button>
    </CenterModal>
  );
};
