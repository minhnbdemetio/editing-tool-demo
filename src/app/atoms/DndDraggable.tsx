import { useDraggable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

export function Draggable({
  x,
  y,
  children,
  id,
}: { x: number; y: number; id: string } & PropsWithChildren) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) `,
      }
    : { transform: `` };

  return (
    <button
      data-no-selecto="true"
      id={id}
      ref={setNodeRef}
      style={{ ...style, position: 'absolute', left: x, top: y }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
