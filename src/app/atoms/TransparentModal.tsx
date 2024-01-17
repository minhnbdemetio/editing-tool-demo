import { FC, PropsWithChildren } from 'react';
import { useOutsideClick } from '../hooks/useClickOutside';
import { useSelectedProperty } from '../store/selected-property';
import { twMerge } from '../utilities/tailwind';
import { useActiveMoveableObject } from '../store/active-moveable-object';

interface TransparentModalProps extends PropsWithChildren {
  className?: string;
}

export const TransparentModal: FC<TransparentModalProps> = ({
  children,
  className,
}) => {
  const { setSelectedProperty } = useSelectedProperty();
  const { activeMoveableObject } = useActiveMoveableObject();

  const modalRef = useOutsideClick(() => {
    const cropContainer = document.getElementById(
      `crop-container-${activeMoveableObject?.id}`,
    );
    if (!cropContainer) {
      setSelectedProperty(null);
    }
  });

  return (
    <div
      ref={modalRef}
      className={twMerge('p-2 bg-white w-full h-full py-5', className)}
    >
      {children}
    </div>
  );
};
