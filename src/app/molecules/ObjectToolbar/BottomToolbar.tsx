import { Button } from '@nextui-org/react';
import { MoveableManagerInterface, Renderer } from 'react-moveable';

const TOOLBAR_ID = 'bottom-toolbar-buttons'

export const BottomToolbar = {
  name: 'bottomToolbar',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    const rectHeight = rect.height;
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
        key={'bottom-toolbar'}
        style={{
          transform: `translate(${rectWidth / 2}px, ${
            rectHeight + 20
          }px) translate(-${Number(toolbarButtons?.offsetWidth) / 2}px)`,
        }}
      >
        <ToolbarButtons />
      </EditableViewer>
    );
  },
} as const;

const ToolbarButtons = () => {
  return (
    <div id={TOOLBAR_ID} className="flex items-center gap-2">
      <Button className="custom-button">Rotate</Button>
    </div>
  );
};
