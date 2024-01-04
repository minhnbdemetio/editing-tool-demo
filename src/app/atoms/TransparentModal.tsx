import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { useOutsideClick } from '../hooks/useClickOutside';
import { useSelectedProperty } from '../store/selected-property';

interface TransparentModalProps extends PropsWithChildren {
  className?: string;
}

export const TransparentModal: FC<TransparentModalProps> = ({
  children,
  className,
}) => {
  const { setSelectedProperty } = useSelectedProperty();

  const modalRef = useOutsideClick(() => setSelectedProperty(null));

  return (
    <div
      ref={modalRef}
      className={clsx(className, 'p-2 bg-white w-full h-full')}
    >
      {children}
    </div>
  );
};
