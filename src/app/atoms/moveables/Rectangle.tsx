import { FC, RefObject, forwardRef, useRef, useState } from 'react';
import MoveableHelper from 'moveable-helper';
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Rotatable,
  Draggable,
  Scalable,
} from 'react-moveable';

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

interface MoveableRectangleProps {}

export const MoveableRectangle = forwardRef<
  HTMLDivElement,
  MoveableRectangleProps
>((props, ref) => {
  const [helper] = useState(() => {
    return new MoveableHelper();
  });

  return (
    <>
      <div className="w-10 h-10 bg-blue-100" ref={ref}>
        <span>hello</span>
      </div>

      <Moveable
        target={ref}
        draggable={true}
        scalable={true}
        keepRatio={true}
        rotatable={true}
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onScaleStart={helper.onScaleStart}
        onScale={helper.onScale}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
      />
    </>
  );
});

MoveableRectangle.displayName = 'MoveableRectangle';
