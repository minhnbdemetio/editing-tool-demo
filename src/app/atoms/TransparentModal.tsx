import { FC, PropsWithChildren } from 'react';
import { useOutsideClick } from '../hooks/useClickOutside';
import { useSelectedProperty } from '../store/selected-property';
import { twMerge } from '../utilities/tailwind';

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
      className={twMerge('p-2 bg-white w-full h-full py-5', className)}
    >
      {children}
    </div>
  );
};
