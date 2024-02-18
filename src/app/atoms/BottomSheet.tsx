import { Modal, ModalContent, ModalProps } from '@nextui-org/react';
import clsx from 'clsx';
import { PropsWithChildren, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { Backdrop } from './Backdrop';
import { SwipeDirection, useSwipeHandler } from '../hooks/useSwipeHandler';

export interface BottomSheetProps
  extends PropsWithChildren<Omit<ModalProps, 'children'>> {
  isOpen?: boolean;
  onClose: () => void;
  hideBackdrop?: boolean;
  className?: string;
  classes?: {
    wrapper?: string;
    content?: string;
  };
}

export const BottomSheet = ({
  hideBackdrop,
  className,
  classes,
  children,
  ...props
}: BottomSheetProps) => {
  const onSwipeDown = useCallback(
    (direction: SwipeDirection) => {
      if (direction !== 'down') {
        return;
      }

      if (typeof props.onClose === 'function') {
        props.onClose();
      }
    },
    [props],
  );

  useSwipeHandler('vertical', onSwipeDown);

  return (
    <Modal
      {...props}
      className={twMerge(
        clsx(
          'rounded-tr-2xl rounded-tl-2xl duration-50 !w-full max-w-full !mx-0 !my-0 !max-h-[85%] overflow-y-auto bg-white',
          className,
          classes?.wrapper,
        ),
      )}
      classNames={{
        wrapper: '!items-end',
      }}
      hideCloseButton
    >
      {hideBackdrop ? null : <Backdrop />}
      <ModalContent
        className={twMerge(
          'm-0 rounded-b-none relative z-50 overflow-visible',
          classes?.content,
        )}
      >
        <div className="absolute bg-white w-14 h-2.5 top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-[9px] border border-border" />
        {children}
      </ModalContent>
    </Modal>
  );
};
