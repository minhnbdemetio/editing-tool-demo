'use client';

import { useDeleteObjetCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useCloneObject } from '@/app/hooks/useActiveMoveableObject';
import { Button } from '@nextui-org/react';
import { FC, useRef } from 'react';
import { MoveableManagerInterface } from 'react-moveable';

export const TopToolbar = {
  name: 'topToolbar',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>) {
    return <ToolbarButtons key={'top-toolbar'} moveable={moveable} />;
  },
} as const;

interface ToolbarButtonsProps {
  moveable: MoveableManagerInterface<any, any>;
}

const ToolbarButtons: FC<ToolbarButtonsProps> = ({ moveable }) => {
  const handleDeleteObject = useDeleteObjetCommand();
  const handleCloneObject = useCloneObject();
  const rect = moveable.getRect();
  const rectWidth = rect.width;
  const ref = useRef<HTMLDivElement>(null);
  const EditableViewer = moveable.useCSS('div', '');
  return (
    <EditableViewer
      ref={ref}
      className="absolute left-0 top-0 flex items-center gap-2 moveable-editable"
      style={{
        transform: `translate(${rectWidth / 2}px, -95px) translate(-${
          Number(ref.current?.clientWidth) / 2
        }px)`,
        willChange: 'transform',
        transformOrigin: '0px 0px',
      }}
    >
      <Button onClick={handleCloneObject}>Clone</Button>
      <Button onClick={handleDeleteObject}>Delete</Button>
      <Button>More</Button>
    </EditableViewer>
  );
};
