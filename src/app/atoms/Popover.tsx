import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Placement, Offsets } from '@popperjs/core';
import { twMerge } from '../utilities/tailwind';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useClickOutside';

interface PopoverProps extends PropsWithChildren {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  placement?: Placement;
  className?: string;
  backdropClassName?: string;
  offset?: Offsets;
  name: string;
}

export const Popover: React.FC<PopoverProps> = ({
  anchorEl,
  onClose = () => {},
  placement,
  children,
  className,
  offset = { x: 0, y: 10 },
  name,
  backdropClassName,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const { styles, attributes } = usePopper(anchorEl, popperElement, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [offset.x, offset.y],
        },
      },
    ],
  });

  return (
    <div>
      {Boolean(anchorEl) && (
        <>
          {createPortal(
            <div>
              <div
                ref={setPopperElement}
                style={{
                  ...styles.popper,
                  padding: '10px',
                }}
                {...attributes.popper}
                className={twMerge(
                  'bg-white z-[110] border-[1px] border-border border-solid shadow-lg rounded-md',
                  className,
                )}
                key={name}
              >
                {children}
              </div>
              <div
                className={twMerge(
                  name,
                  'w-full fixed h-full top-0 left-0 z-100',
                  backdropClassName,
                )}
                onClick={e => {
                  e.preventDefault();
                  onClose();
                }}
              ></div>
            </div>,
            document.querySelector('#popover') as any,
          )}
        </>
      )}
    </div>
  );
};
