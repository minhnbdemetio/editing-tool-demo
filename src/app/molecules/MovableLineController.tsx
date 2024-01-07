import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableLineObject } from '../factories/MoveableLine';
import { Draggable } from '../atoms/Draggable';
import { getAngleByPoint } from '../utilities/line';
import { SvgLineType } from '../utilities/svg-line';
import { twMerge } from '../utilities/tailwind';

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

const ElbowedLineController: React.FC<{ forceReload: () => void }> = ({
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

  const lineObject = activeMoveableObject as MoveableLineObject;

  const startPoint = lineObject.line?.points;
  const endPoint = lineObject.line?.endPoint;

  const linePositions = lineObject?.line?.getElbowedLinePositions();

  const updateLineControllerPosition = () => {
    const positions = lineObject?.line?.getElbowedLinePositions();

    positions?.forEach(position => {
      const id = position.startId + position.endId;
      const element = document.getElementById(id);
      if (element) {
        element.style.transform = `translate(${
          (position.x1 + position.x2) / 2
        }px, ${(position.y1 + position.y2) / 2}px)`;
      }
    });
  };

  return (
    <>
      {startPoint && (
        <Draggable
          onDrag={e => {
            const next = startPoint.getNext();

            if (next && lineObject && lineObject.line) {
              const isVertical = startPoint.x === next.x;
              const isHorizontal = startPoint.y === next.y;

              if (isVertical) {
                lineObject.line?.updatePoint(startPoint.id, next.x, e.y);

                if (Math.abs(e.x - next.x) >= 20) {
                  console.debug(startPoint.id);
                  lineObject.line?.createPrevFor(startPoint.id, e.x, e.y);
                  // forceReload();
                }
              }

              console.debug('points', lineObject.line.getPoints());

              const { x, y } = lineObject.line.getDisplayPosition();
              anchorRef.innerHTML = lineObject.line.toSvg() || '';
              anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
              anchorRef.style.transformOrigin = 'left center';

              updateLineControllerPosition();
            }
          }}
          style={{
            transform: ` translate(${startPoint?.x}px, ${startPoint?.y}px)`,
            width: 'fit-content',
          }}
        >
          <div className="w-[15px] h-[15px] bg-[red] rounded-[50%]"></div>
        </Draggable>
      )}
      {linePositions?.map(pos => (
        <Draggable
          id={pos.startId + pos.endId}
          style={{
            transform: ` translate(${(pos.x1 + pos.x2) / 2}px, ${
              (pos.y1 + pos.y2) / 2
            }px)`,
          }}
          key={pos.startId + pos.endId}
          onDrag={point => {
            if (lineObject?.line) {
              if (pos.y2 === pos.y1) {
                lineObject?.line?.updateElbowedPoints(pos.startId, pos.endId, {
                  y: point.y,
                });
              }
              if (pos.x2 === pos.x1) {
                lineObject?.line?.updateElbowedPoints(pos.startId, pos.endId, {
                  x: point.x,
                });
              }

              const { x, y } = lineObject.line.getDisplayPosition();
              // const angle = getAngleByPoint(leftX, leftY, rightX, rightY, 'end');
              anchorRef.innerHTML = lineObject.line.toSvg() || '';
              anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
              anchorRef.style.transformOrigin = 'left center';

              updateLineControllerPosition();
            }
          }}
          dragStyle={pos.y2 === pos.y1 ? 'yOnly' : 'xOnly'}
        >
          <div
            style={{ background: 'red' }}
            className={twMerge('bg-red absolute rounded-md', {
              'w-[30px] h-[10px] ': pos.y2 === pos.y1,
              'h-[30px] w-[10px] -translate-y-1/2': pos.x2 === pos.x1,
            })}
          ></div>
        </Draggable>
      ))}
      <Draggable
        onDrag={() => {}}
        style={{
          transform: ` translate(${endPoint?.x}px, ${endPoint?.y}px)`,
        }}
      >
        <div className="w-[15px] h-[15px] bg-[red] rounded-[50%]"></div>
      </Draggable>
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

  if (
    (activeMoveableObject as MoveableLineObject)?.line?.getType() ===
    SvgLineType.Elbowed
  )
    return (
      <ElbowedLineController forceReload={() => setForceReload(v => v + 1)} />
    );

  return <></>;
};
