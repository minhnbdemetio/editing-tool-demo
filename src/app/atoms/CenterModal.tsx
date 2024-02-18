import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CenterModalProps extends ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  header?: string | ReactNode;
  footer?: ReactNode;
  classes?: {
    wrapper?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
}

export const CenterModal = ({
  header,
  footer,
  classes,
  children,
  ...props
}: CenterModalProps) => {
  return (
    <Modal
      placement="center"
      classNames={{
        wrapper: 'items-center',
      }}
      {...props}
    >
      <ModalContent
        className={twMerge(
          'rounded-[20px] w-[335px] mx-auto max-w-[89%] bg-white',
          classes?.wrapper,
        )}
      >
        {header ? (
          <ModalHeader
            className={twMerge(
              'text-sml leading-[27px] pt-4 pb-2',
              classes?.header,
            )}
          >
            {header}
          </ModalHeader>
        ) : null}

        <ModalBody
          className={twMerge('text-smd leading-4.5 pt-0 pb-6', classes?.body)}
        >
          {children}
        </ModalBody>

        {footer ? (
          <ModalFooter
            className={twMerge(
              'border-t border-t-default3 grid grid-cols-2 divide-x divide-default3 gap-0 py-0 text-primary1 text-md leading-[22px] font-medium',
              classes?.footer,
            )}
          >
            {footer}
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
};
