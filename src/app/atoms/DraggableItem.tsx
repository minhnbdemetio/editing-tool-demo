import { cloneElement } from 'react';
import { FC, PropsWithChildren, forwardRef } from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps extends PropsWithChildren {
  onDrop: any;
  type: string;
}

export const DraggableItem: FC<DraggableItemProps> = ({
  onDrop,
  type,
  children,
}) => {
  const [{}, drag] = useDrag(
    () => ({
      type,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          onDrop();
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [onDrop],
  );

  if (!children) return null;

  return cloneElement(children as React.ReactElement, { ref: drag });
};
// DraggableItem.displayName = 'DraggableItem';
