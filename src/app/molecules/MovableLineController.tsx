import React, { useEffect, useState } from 'react';
import { Draggable } from '../atoms/Draggable';
import { SvgLineType } from '../utilities/svg-line';
import { twMerge } from '../utilities/tailwind';
import { LinePoint } from '../utilities/line-point';
import { useActiveMoveableLineObject } from '../hooks/useActiveMoveableObject';
import { isLine } from '../utilities/moveable';
import { MoveableLineObject } from '../factories/MoveableLine';

interface MovableLineControllerProps {}

const StraightLineController: React.FC<{
  forceReload: () => void;
  activeMoveableObject: MoveableLineObject;
}> = ({ forceReload, activeMoveableObject }) => {
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const isLine = activeMoveableObject?.type === 'line';

    if (isLine) {
      const activeLineMovable = activeMoveableObject;

      setAnchorRef(
        (document.getElementById(activeLineMovable.id) as HTMLDivElement) ||
          null,
      );
    } else {
      setAnchorRef(null);
    }
  }, [activeMoveableObject]);

  if (!anchorRef) return null;

  const points = activeMoveableObject?.line?.getPoints() || [];

  const handleMove = (pointId: string, point: { x: number; y: number }) => {
    const lineObject = activeMoveableObject;

    if (lineObject && lineObject.line) {
      lineObject.line.updatePoint(pointId, point.x, point.y);

      lineObject.updateUI();
    }
  };

  return (
    <>
      <button
        onClick={() => {
          const lineObject = activeMoveableObject;
          if (lineObject && lineObject.line) {
            lineObject.line?.toElbowed();
            const { x, y } = lineObject.line?.getDisplayPosition();
            anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(${lineObject.line.getRotateAngle()}deg)`;
            forceReload();
          }
        }}
      >
        To elbowed
      </button>

      {points.map(point => (
        <Draggable
          id={`head-` + point.id}
          key={point.id}
          style={{
            background: 'red',
            transform: `translate(${point.x}px, ${point.y}px)`,
          }}
          onDrag={e => handleMove(point.id, e)}
        >
          <div
            className="absolute w-[15px] h-[15px] rounded-[50%] border-[1px] border-gray-50 border-solid"
            style={{
              background: 'red',
              border: '1px solid #e8e8e8',
              transform: `translate(${activeMoveableObject.line.padding}px, ${activeMoveableObject.line.padding}px)`,
            }}
          ></div>
        </Draggable>
      ))}
    </>
  );
};

const ElbowedLineController: React.FC<{
  forceReload: () => void;
  activeMoveableObject: MoveableLineObject;
}> = ({ forceReload, activeMoveableObject }) => {
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const isLine = activeMoveableObject?.type === 'line';

    if (isLine) {
      const activeLineMovable = activeMoveableObject;

      setAnchorRef(
        (document.getElementById(activeLineMovable.id) as HTMLDivElement) ||
          null,
      );
    } else {
      setAnchorRef(null);
    }
  }, [activeMoveableObject]);

  const startPoint = activeMoveableObject.line.points;
  const endPoint = activeMoveableObject.line.endPoint;

  const linePositions = activeMoveableObject.line.getElbowedLinePositions();

  const updateHeadControllerPosition = (hide?: boolean) => {
    const start = activeMoveableObject.line?.points;
    const end = activeMoveableObject.line?.endPoint;

    if (start && end) {
      const startElement = document.getElementById('head-' + start.id);
      const endElement = document.getElementById('head-' + end.id);

      if (hide) {
        if (startElement) startElement.style.display = `none`;

        if (endElement) endElement.style.display = `none`;
        return;
      }

      if (startElement) {
        startElement.style.display = `block`;
        startElement.style.transform = ` translate(${start?.x}px, ${start?.y}px)`;
      }

      if (endElement) {
        endElement.style.display = `block`;
        endElement.style.transform = ` translate(${end?.x}px, ${end?.y}px)`;
      }
    }
  };

  const updateLineControllerPosition = (hide?: boolean) => {
    let point: LinePoint | undefined | null = activeMoveableObject.line.points;

    while (point) {
      const next = point.getNext();

      if (next) {
        const id = point.id + next.id;
        const element = document.getElementById(id);

        if (hide && element) {
          element.style.display = 'none';
          point = point.getNext();
          continue;
        }

        if (point.hasNextCurve() || point.hasPrevCurve()) {
          if (element) {
            element.style.transform = `translate(${(point.x + next.x) / 2}px, ${
              (point.y + next.y) / 2
            }px)`;
            element.style.display = 'block';
          }
        } else {
          if (element) {
            element.style.display = 'none';
          }
        }
      }

      point = point.getNext();
    }
  };

  if (!anchorRef) return null;

  const onDragFreePoint = (
    id: string,
    newHeadId: string,
    e: { x: number; y: number },
    referencePoint: LinePoint,
    onCreateHead: (id: string, x: number, y: number) => void,
    onRemoveNewHead: () => void,
  ) => {
    const point = activeMoveableObject.line.getPointById(id);

    if (point && referencePoint) {
      const isVertical = point.isEqual(point.x, referencePoint.x);
      const isHorizontal = point.isEqual(point.y, referencePoint.y);

      if (isVertical) {
        activeMoveableObject.line.updatePoint(id, referencePoint.x, e.y);

        if (Math.abs(e.x - referencePoint.x) >= 20) {
          if (!newHeadId) {
            onCreateHead(id, e.x, e.y);
          } else {
            activeMoveableObject.line.updatePoint(newHeadId, e.x, e.y);
          }
        } else {
          if (newHeadId) {
            onRemoveNewHead();
          }
        }
      } else if (isHorizontal) {
        activeMoveableObject.line.updatePoint(id, e.x, referencePoint.y);

        if (Math.abs(e.y - referencePoint.y) >= 20) {
          if (!newHeadId) {
            onCreateHead(id, e.x, e.y);
          } else {
            activeMoveableObject.line.updatePoint(newHeadId, e.x, e.y);
          }
        } else {
          if (newHeadId) {
            onRemoveNewHead();
          }
        }
      }

      const { x, y } = activeMoveableObject.line.getDisplayPosition();
      anchorRef.innerHTML = activeMoveableObject.line.toSvg() || '';
      anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;

      updateLineControllerPosition();
    }
  };

  return (
    <>
      {startPoint && (
        <Draggable
          id={`head-` + startPoint.id}
          onDragEnd={target => {
            activeMoveableObject.line.mergeStraightLine();

            const newHead = target.getAttribute('data-new-head') || '';
            if (newHead) {
              target.setAttribute('data-target', newHead);
              target.setAttribute('id', newHead);
              target.setAttribute('data-new-head', '');
              forceReload();
            }
          }}
          data-target={startPoint.id}
          onDrag={(e, target) => {
            const id = target.getAttribute('data-target') || '';
            const newHeadId = target.getAttribute('data-new-head') || '';
            onDragFreePoint(
              id,
              newHeadId,
              e,
              activeMoveableObject.line
                ?.getPointById(id)
                ?.getNext() as LinePoint,
              (_, x, y) => {
                activeMoveableObject.line?.createPrevFor(id, x, y);
                target.setAttribute(
                  'data-new-head',
                  activeMoveableObject.line?.points?.id || '',
                );
              },
              () => {
                if (activeMoveableObject.line) {
                  activeMoveableObject.line.removePoint(newHeadId);
                  target.setAttribute('data-new-head', '');
                }
              },
            );
          }}
          style={{
            transform: ` translate(${startPoint?.x}px, ${startPoint?.y}px)`,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              transform: `translate(${activeMoveableObject.line?.padding}px, ${activeMoveableObject.line?.padding}px)`,
            }}
            className="w-[15px] h-[15px] bg-[red] rounded-[50%]"
          ></div>
        </Draggable>
      )}
      {linePositions?.map(pos => (
        <Draggable
          onDragEnd={() => {
            activeMoveableObject?.line?.mergeStraightLine();
            updateLineControllerPosition();
          }}
          id={pos.startId + pos.endId}
          style={{
            transform: ` translate(${(pos.x1 + pos.x2) / 2}px, ${
              (pos.y1 + pos.y2) / 2
            }px)`,
          }}
          key={pos.startId + pos.endId}
          onDrag={point => {
            if (activeMoveableObject.line) {
              if (pos.y2 === pos.y1) {
                activeMoveableObject.line.updateElbowedPoints(
                  pos.startId,
                  pos.endId,
                  {
                    y: point.y,
                  },
                );
              }
              if (pos.x2 === pos.x1) {
                activeMoveableObject.line.updateElbowedPoints(
                  pos.startId,
                  pos.endId,
                  {
                    x: point.x,
                  },
                );
              }

              const { x, y } = activeMoveableObject.line.getDisplayPosition();
              anchorRef.innerHTML = activeMoveableObject.line.toSvg() || '';
              anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;

              updateLineControllerPosition();
              updateHeadControllerPosition();
            }
          }}
          dragStyle={pos.y2 === pos.y1 ? 'yOnly' : 'xOnly'}
        >
          <div
            style={{
              background: 'red',
              transform: `translate(${activeMoveableObject.line?.padding}px, ${activeMoveableObject.line?.padding}px)`,
            }}
            className={twMerge('bg-red absolute rounded-md', {
              'w-[30px] h-[10px] ': pos.y2 === pos.y1,
              'h-[30px] w-[10px] -translate-y-1/2': pos.x2 === pos.x1,
            })}
          ></div>
        </Draggable>
      ))}
      {endPoint && (
        <Draggable
          id={`head-` + endPoint.id}
          onDragEnd={target => {
            activeMoveableObject.line?.mergeStraightLine();
            const newHead = target.getAttribute('data-new-end') || '';
            if (newHead) {
              target.setAttribute('data-target', newHead);
              target.setAttribute('id', newHead);
              target.setAttribute('data-new-end', '');
              forceReload();
            }
          }}
          data-target={endPoint.id}
          onDrag={(e, target) => {
            const id = target.getAttribute('data-target') || '';
            const newHeadId = target.getAttribute('data-new-end') || '';
            onDragFreePoint(
              id,
              newHeadId,
              e,
              activeMoveableObject.line
                ?.getPointById(id)
                ?.getPrev() as LinePoint,
              (_, x, y) => {
                activeMoveableObject.line?.createNewEnd(id, x, y);
                target.setAttribute(
                  'data-new-end',
                  activeMoveableObject.line?.endPoint?.id || '',
                );
              },
              () => {
                if (activeMoveableObject.line) {
                  activeMoveableObject.line.removePoint(newHeadId);
                  target.setAttribute('data-new-end', '');
                }
              },
            );
          }}
          style={{
            transform: ` translate(${endPoint?.x}px, ${endPoint?.y}px)`,
          }}
        >
          <div
            style={{
              transform: `translate(${activeMoveableObject.line?.padding}px, ${activeMoveableObject.line?.padding}px)`,
            }}
            className="w-[15px] h-[15px] bg-[red] rounded-[50%]"
          ></div>
        </Draggable>
      )}
    </>
  );
};

export const MovableLineController: React.FC<
  MovableLineControllerProps
> = () => {
  const activeMoveableObject = useActiveMoveableLineObject();
  const [_, setForceReload] = useState(0);

  if (!isLine(activeMoveableObject) || activeMoveableObject.isDragging())
    return null;
  if (activeMoveableObject.line.getType() === SvgLineType.Straight)
    return (
      <StraightLineController
        activeMoveableObject={activeMoveableObject}
        forceReload={() => setForceReload(v => v + 1)}
      />
    );

  if (activeMoveableObject.line.getType() === SvgLineType.Elbowed)
    return (
      <ElbowedLineController
        activeMoveableObject={activeMoveableObject}
        forceReload={() => setForceReload(v => v + 1)}
      />
    );

  return <></>;
};
