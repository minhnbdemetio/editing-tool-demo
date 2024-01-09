import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableLineObject } from '../factories/MoveableLine';
import { Draggable } from '../atoms/Draggable';
import { SvgLineType } from '../utilities/svg-line';
import { twMerge } from '../utilities/tailwind';
import { LinePoint } from '../utilities/line-point';

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

  const lineObject = activeMoveableObject as MoveableLineObject;

  const updateHeadControllerPosition = (hide?: boolean) => {
    const start = lineObject?.line?.points;
    const end = lineObject?.line?.endPoint;

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

  useEffect(() => {
    if (activeMoveableObject) {
      activeMoveableObject.moveable?.on('dragStart', () => {
        updateHeadControllerPosition(true);
      });
      activeMoveableObject.moveable?.on('dragEnd', () => {
        updateHeadControllerPosition();
      });
    }
  }, [activeMoveableObject]);

  if (!anchorRef) return null;

  const points =
    (activeMoveableObject as MoveableLineObject)?.line?.getPoints() || [];

  const handleMove = (pointId: string, point: { x: number; y: number }) => {
    const lineObject = activeMoveableObject as MoveableLineObject;

    if (lineObject && lineObject.line) {
      lineObject.line.updatePoint(pointId, point.x, point.y);

      if (anchorRef) {
        const { x, y } = lineObject.line.getDisplayPosition();
        anchorRef.innerHTML = lineObject.line.toSvg() || '';
        anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(${lineObject.line.getRotateAngle()}deg)`;
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
              transform: `translate(${lineObject.line?.padding}px, ${lineObject.line?.padding}px)`,
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

  const lineObject = activeMoveableObject as MoveableLineObject;

  const startPoint = lineObject?.line?.points;
  const endPoint = lineObject?.line?.endPoint;

  const linePositions = lineObject?.line?.getElbowedLinePositions();

  const updateHeadControllerPosition = (hide?: boolean) => {
    const start = lineObject?.line?.points;
    const end = lineObject?.line?.endPoint;

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
    let point: LinePoint | undefined | null = lineObject?.line?.points;

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

  useEffect(() => {
    if (activeMoveableObject) {
      activeMoveableObject.moveable?.on('dragStart', () => {
        updateLineControllerPosition(true);
        updateHeadControllerPosition(true);
      });
      activeMoveableObject.moveable?.on('dragEnd', () => {
        updateLineControllerPosition();
        updateHeadControllerPosition();
      });
    }
  }, [activeMoveableObject]);

  if (!anchorRef) return null;

  const onDragFreePoint = (
    id: string,
    newHeadId: string,
    e: { x: number; y: number },
    referencePoint: LinePoint,
    onCreateHead: (id: string, x: number, y: number) => void,
    onRemoveNewHead: () => void,
  ) => {
    const point = lineObject.line?.getPointById(id);

    if (point && referencePoint && lineObject && lineObject.line) {
      const isVertical = point.isEqual(point.x, referencePoint.x);
      const isHorizontal = point.isEqual(point.y, referencePoint.y);

      if (isVertical) {
        lineObject.line?.updatePoint(id, referencePoint.x, e.y);

        if (Math.abs(e.x - referencePoint.x) >= 20) {
          if (!newHeadId) {
            onCreateHead(id, e.x, e.y);
          } else {
            lineObject.line.updatePoint(newHeadId, e.x, e.y);
          }
        } else {
          if (newHeadId) {
            onRemoveNewHead();
          }
        }
      } else if (isHorizontal) {
        lineObject.line?.updatePoint(id, e.x, referencePoint.y);

        if (Math.abs(e.y - referencePoint.y) >= 20) {
          if (!newHeadId) {
            onCreateHead(id, e.x, e.y);
          } else {
            lineObject.line.updatePoint(newHeadId, e.x, e.y);
          }
        } else {
          if (newHeadId) {
            onRemoveNewHead();
          }
        }
      }

      const { x, y } = lineObject.line.getDisplayPosition();
      anchorRef.innerHTML = lineObject.line.toSvg() || '';
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
            lineObject.line?.mergeStraightLine();

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
              lineObject.line?.getPointById(id)?.getNext() as LinePoint,
              (_, x, y) => {
                lineObject.line?.createPrevFor(id, x, y);
                target.setAttribute(
                  'data-new-head',
                  lineObject.line?.points?.id || '',
                );
              },
              () => {
                if (lineObject.line) {
                  lineObject.line.removePoint(newHeadId);
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
              transform: `translate(${lineObject.line?.padding}px, ${lineObject.line?.padding}px)`,
            }}
            className="w-[15px] h-[15px] bg-[red] rounded-[50%]"
          ></div>
        </Draggable>
      )}
      {linePositions?.map(pos => (
        <Draggable
          onDragEnd={() => {
            lineObject.line?.mergeStraightLine();
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
              anchorRef.innerHTML = lineObject.line.toSvg() || '';
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
              transform: `translate(${lineObject.line?.padding}px, ${lineObject.line?.padding}px)`,
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
            lineObject.line?.mergeStraightLine();
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
              lineObject.line?.getPointById(id)?.getPrev() as LinePoint,
              (_, x, y) => {
                lineObject.line?.createNewEnd(id, x, y);
                target.setAttribute(
                  'data-new-end',
                  lineObject.line?.endPoint?.id || '',
                );
              },
              () => {
                if (lineObject.line) {
                  lineObject.line.removePoint(newHeadId);
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
              transform: `translate(${lineObject.line?.padding}px, ${lineObject.line?.padding}px)`,
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
