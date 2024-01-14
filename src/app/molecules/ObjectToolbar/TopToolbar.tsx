import { useDeleteObjetCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useCloneObject } from '@/app/hooks/useActiveMoveableObject';
import { Button } from '@nextui-org/react';
import { MoveableManagerInterface, Renderer } from 'react-moveable';

const TOOLBAR_ID = 'top-toolbar-buttons';

export const TopToolbar = {
  name: 'topToolbar',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    const rectWidth = rect.width;
    const toolbarButtons = document.getElementById(TOOLBAR_ID);
    const EditableViewer = moveable.useCSS(
      'div',
      `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
      `,
    );
    return (
      <EditableViewer
        key={'top-toolbar'}
        style={{
          transform: `translate(${rectWidth / 2}px, -95px) translate(-${
            Number(toolbarButtons?.offsetWidth) / 2
          }px)`,
        }}
      >
        <ToolbarButtons />
      </EditableViewer>
    );
  },
} as const;

const ToolbarButtons = () => {
  const handleDeleteObject = useDeleteObjetCommand();
  const handleCloneObject = useCloneObject();

  return (
    <div id={TOOLBAR_ID} className="flex items-center gap-2">
      <Button onClick={handleCloneObject} className="custom-button">
        Clone
      </Button>
      <Button onClick={handleDeleteObject} className="custom-button">
        Delete
      </Button>
      <Button className="custom-button">More</Button>
    </div>
  );
};
