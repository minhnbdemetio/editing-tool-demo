import React, { useEffect, useState } from 'react';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableLineObject } from '../factories/MoveableLine';
import { useDrag } from 'react-dnd';

interface MovableLineControllerProps {}

export const MovableLineController: React.FC<
  MovableLineControllerProps
> = () => {
  const { activeMoveableObject } = useActiveMoveableObject();

  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const isLine = activeMoveableObject?.type === 'line';

    if (isLine) {
      const activeLineMovable = activeMoveableObject as MoveableLineObject;

      setAnchorRef(
        (document.getElementById(activeLineMovable.id) as HTMLDivElement) ||
          null,
      );
    } else {
      setAnchorRef(null);
    }
  }, [activeMoveableObject]);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'ITEM',
    item: { activeMoveableObject },
    collect: monitor => {
      if (activeMoveableObject) {
        activeMoveableObject.skipClickoutEvent = true;
      }

      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  console.debug(collected);

  if (!anchorRef) return null;

  var matrix = new WebKitCSSMatrix(anchorRef.style.transform);

  const YCenterPoint = matrix.m42 + anchorRef.clientHeight / 2;

  console.debug({ matrix });

  return (
    <>
      <div
        ref={drag}
        className="absolute w-[10px] h-[10px] rounded-[50%] border-[1px] border-gray-50 border-solid"
        style={{
          left: matrix.m41,
          top: YCenterPoint,
          background: 'white',
          border: '1px solid #e8e8e8',
          transform: 'translate(0, -50%)',
        }}
      ></div>
      <div
        className="absolute w-[10px] h-[10px] rounded-[50%] border-[1px] border-gray-50 border-solid"
        style={{
          left: matrix.m41 + anchorRef.clientWidth,
          top: YCenterPoint,
          background: 'white',
          border: '1px solid #e8e8e8',
          transform: 'translate(0, -50%)',
        }}
      ></div>
    </>
  );
};
