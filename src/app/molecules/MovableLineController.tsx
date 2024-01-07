import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableLineObject } from '../factories/MoveableLine';
import { Draggable } from '../atoms/Draggable';
import { getAngleByPoint } from '../utilities/line';
import { SvgLineType } from '../utilities/svg-line';

interface MovableLineControllerProps {}

const StraightLineController: React.FC<{ forceReload: () => void }> = ({
  forceReload,
}) => {
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

  if (!anchorRef) return null;

  const points =
    (activeMoveableObject as MoveableLineObject)?.line?.getPoints() || [];

  const handleMoveLeftCursor = (point: { x: number; y: number }) => {
    const lineObject = activeMoveableObject as MoveableLineObject;

    const leftX = point.x;
    const leftY = point.y;
    const rightX = lineObject.x2;
    const rightY = lineObject.y2;

    lineObject.set({ x1: leftX as number, y1: leftY as number });

    const vertical = rightX - leftX;
    const horizontal = rightY - leftY;
    let lineWidth = Math.sqrt(Math.pow(vertical, 2) + Math.pow(horizontal, 2));

    const svgLine = lineObject.line;
    svgLine?.setLength(lineWidth);

    const svg = svgLine?.toSvg();

    if (anchorRef) {
      const angle = getAngleByPoint(leftX, leftY, rightX, rightY, 'end');
      anchorRef.innerHTML = svg || '';
      anchorRef.style.transform = `translate(${leftX}px, ${leftY}px) rotate(${
        angle - 90
      }deg)`;
      anchorRef.style.transformOrigin = 'left center';
    }
  };

  const handleMove = (pointId: string, point: { x: number; y: number }) => {
    const lineObject = activeMoveableObject as MoveableLineObject;

    if (lineObject && lineObject.line) {
      lineObject.line.updatePoint(pointId, point.x, point.y);
      console.debug(lineObject.line.toSvg());

      if (anchorRef) {
        const { x, y } = lineObject.line.getDisplayPosition();
        // const angle = getAngleByPoint(leftX, leftY, rightX, rightY, 'end');
        console.debug('rotate', lineObject.line.getRotateAngle());
        anchorRef.innerHTML = lineObject.line.toSvg() || '';
        anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(${lineObject.line.getRotateAngle()}deg)`;
        anchorRef.style.transformOrigin = 'left center';
      }
    }
  };

  const handleMoveRightCursor = (point: { x: number; y: number }) => {
    const lineObject = activeMoveableObject as MoveableLineObject;

    const leftX = lineObject.x1;
    const leftY = lineObject.y1;
    const rightX = point.x;
    const rightY = point.y;

    lineObject.set({ x2: rightX as number, y2: rightY as number });

    const vertical = rightX - leftX;
    const horizontal = rightY - leftY;
    let lineWidth = Math.sqrt(Math.pow(vertical, 2) + Math.pow(horizontal, 2));

    const svgLine = lineObject.line;
    svgLine?.setLength(lineWidth);

    const svg = svgLine?.toSvg();

    if (anchorRef) {
      const angle = getAngleByPoint(leftX, leftY, rightX, rightY, 'end');
      anchorRef.innerHTML = svg || '';
      anchorRef.style.transform = `translate(${leftX}px, ${leftY}px) rotate(${
        angle - 90
      }deg)`;
      anchorRef.style.transformOrigin = 'left center';
    }
  };

  console.debug(points);

  return (
    <>
      <button
        onClick={() => {
          const lineObject = activeMoveableObject as MoveableLineObject;
          if (lineObject && lineObject.line) {
            lineObject.line?.toElbowed();
            const { x, y } = lineObject.line?.getDisplayPosition();
            anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(${lineObject.line.getRotateAngle()}deg)`;
            anchorRef.style.transformOrigin = 'left center';
            forceReload();
          }
        }}
        style={{
          transform: `translate(${
            (activeMoveableObject as MoveableLineObject).x1 +
            anchorRef.clientWidth / 2
          }px, ${(activeMoveableObject as MoveableLineObject).y1 - 100}px)`,
        }}
      >
        To elbowed
      </button>

      {points.map(point => (
        <Draggable
          key={point.id}
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
          }}
          onDrag={e => handleMove(point.id, e)}
        >
          <div
            className="absolute w-[15px] h-[15px] rounded-[50%] border-[1px] border-gray-50 border-solid"
            style={{
              background: 'white',
              border: '1px solid #e8e8e8',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        </Draggable>
      ))}
    </>
  );
};

export const MovableLineController: React.FC<
  MovableLineControllerProps
> = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const [forceReload, setForceReload] = useState(0);

  if (
    (activeMoveableObject as MoveableLineObject)?.line?.getType() ===
    SvgLineType.Straight
  )
    return (
      <StraightLineController forceReload={() => setForceReload(v => v + 1)} />
    );

  return <></>;
};
