import { Button } from '@nextui-org/react';
import { FC, useRef } from 'react';
import { MoveableManagerInterface } from 'react-moveable';

export const BottomToolbar = {
  name: 'bottomToolbar',
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>) {
    return <ToolbarButtons key={'bottom-toolbar'} moveable={moveable} />;
  },
} as const;

interface ToolbarButtonsProps {
  moveable: MoveableManagerInterface<any, any>;
}

const ToolbarButtons: FC<ToolbarButtonsProps> = ({ moveable }) => {
  const rect = moveable.getRect();
  const rectWidth = rect.width;
  const rectHeight = rect.height;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 flex items-center gap-2 moveable-bottom-toolbar"
      style={{
        transform: `translate(${rectWidth / 2}px, ${
          rectHeight + 10
        }px) translate(-${Number(ref.current?.clientWidth) / 2}px)`,
        willChange: 'transform',
        transformOrigin: '0px 0px',
      }}
    >
      <Button>Rotate</Button>
    </div>
  );
};
