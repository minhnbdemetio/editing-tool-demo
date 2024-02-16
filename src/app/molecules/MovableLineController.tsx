import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Draggable as DndDraggable } from '../atoms/DndDraggable';
import { Point } from '../utilities/line/Point';
import { useActiveMoveableLineObject } from '../hooks/useActiveMoveableObject';
import { isLine } from '../utilities/moveable';
import { MoveableLineObject } from '../lib/moveable/MoveableLine';
import { useForceReloadLineController } from '../store/force-reload-line-controller';
import { SvgLineType } from '../utilities/line/Interface.Line';
import { ElbowedLine } from '../utilities/line/ElbowedLine';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  Modifier,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useDesign } from '../store/design-objects';
import { StraightLine } from '../utilities/line/StraightLine';
import { twMerge } from '../utilities/tailwind';

interface MovableLineControllerProps {}

const StraightLineController: React.FC<{
  forceReload: () => void;
  activeMoveableObject: MoveableLineObject;
}> = ({ forceReload, activeMoveableObject }) => {
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);
  const scale = useDesign(s => s.scale);

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

  const scaledDndModifiers: Modifier = useCallback(
    ({ transform }) => {
      transform.x = transform.x / scale;
      transform.y = transform.y / scale;
      return transform;
    },
    [scale],
  );

  const line = useMemo(
    () => activeMoveableObject.line as StraightLine,
    [activeMoveableObject],
  );

  const [draftState, setDraftState] = useState<
    { id: string; x: number; y: number } | undefined
  >(undefined);
  const handleDragStart = useCallback(
    (e: DragStartEvent) => {
      const point = line.points.findById(e.active.id.toString());

      if (point) setDraftState(point.toObject());
    },
    [line],
  );
  const handleDragMove = useCallback(
    (e: DragMoveEvent) => {
      const point = line.points.findById(e.active.id.toString());

      if (point && draftState) {
        point.setX(draftState.x + e.delta.x);
        point.setY(draftState.y + e.delta.y);
      }

      activeMoveableObject.updateUI();
    },
    [line, draftState, activeMoveableObject],
  );

  const handleDragEnd = useCallback(() => {
    setDraftState(undefined);
  }, []);

  if (!anchorRef) return null;

  const points = line.points.toArray() || [];

  return (
    <>
      <div>
        <DndContext
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges, scaledDndModifiers]}
        >
          {points.map(point => (
            <DndDraggable key={point.id} id={point.id} x={point.x} y={point.y}>
              <div
                data-no-selecto="true"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'red',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
            </DndDraggable>
          ))}
        </DndContext>
      </div>
    </>
  );
};

const ElbowedLineController: React.FC<{
  forceReload: () => void;
  activeMoveableObject: MoveableLineObject;
}> = ({ forceReload, activeMoveableObject }) => {
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);

  const line = useMemo(
    () => activeMoveableObject.line as ElbowedLine,
    [activeMoveableObject.line],
  );

  useEffect(() => {
    setAnchorRef(
      (document.getElementById(activeMoveableObject.id) as HTMLDivElement) ||
        null,
    );
  }, [activeMoveableObject]);

  const startPoint = line.points.getHead();
  const endPoint = line.points.getEnd();

  const scale = useDesign(s => s.scale);

  const linePositions = line.getLinePositions();

  const scaledDndModifiers: Modifier = useCallback(
    ({ transform, activatorEvent }) => {
      transform.x = transform.x / scale;
      transform.y = transform.y / scale;
      return transform;
    },
    [scale],
  );
  const moveStraightOnly: Modifier = useCallback(
    ({ transform, activatorEvent }) => {
      const target = activatorEvent?.target as HTMLDivElement;
      const direction = target?.getAttribute('data-direction');
      if (direction) {
        if (direction === 'y') {
          transform.x = 0;
        } else {
          transform.y = 0;
        }
      }
      return transform;
    },
    [],
  );

  const [draftState, setDraftState] = useState<
    | {
        id: string;
        x: number;
        y: number;
        isHead?: boolean;
        isEnd?: boolean;
        direction?: 'vertical' | 'horizontal';
      }
    | undefined
  >(undefined);

  const onDragBridgePointStart = ({ active }: DragStartEvent) => {
    if (!line.points) return;
    const startId = active.id.toString().split(',')[0];

    const point = line.points.findById(startId || '');

    if (point) {
      setDraftState({ id: active.id.toString(), x: point.x, y: point.y });
    }
  };

  const onDragBridgePointMove = ({
    delta,
    active,
    activatorEvent,
  }: DragMoveEvent) => {
    const target = activatorEvent?.target as HTMLDivElement;
    const direction = target?.getAttribute('data-direction');

    if (direction && draftState) {
      const points = active.id
        .toString()
        .split(',')
        .map(id => line.points.findById(id));
      if (direction === 'y') {
        points.forEach(p => p?.setY(draftState.y + delta.y));
      } else {
        points.forEach(p => p?.setX(draftState.x + delta.x));
      }

      activeMoveableObject.updateUI();
      activeMoveableObject.updatePointerControllerUI({
        exceptId: active.id.toString(),
      });
      activeMoveableObject.updateHeadControl();
    }
  };

  const onStartDragHead = useCallback(
    (e: DragStartEvent) => {
      const point = line.points.findById(e.active.id.toString());
      const referencePoint = point?.isHead()
        ? point?.getNext()
        : point?.getPrev();

      if (point)
        setDraftState({
          ...point.toObject(),
          isHead: point.isHead(),
          isEnd: point.isEnd(),
          direction: point?.isEqualX(referencePoint as Point)
            ? 'vertical'
            : 'horizontal',
        });
    },
    [line],
  );
  const onHeadDragMove = useCallback(
    ({ delta, active }: DragMoveEvent) => {
      const BREAKPOINT = 20;

      const point = line.points.findById(draftState?.id || '');

      if (draftState && point) {
        const newY = draftState.y + delta.y;
        const newX = draftState.x + delta.x;

        const newHead = draftState.isHead ? point.getPrev() : point.getNext();
        newHead?.setX(newX);
        newHead?.setY(newY);

        const createHead = () => {
          const newPoint = new Point(newX, newY, null, point);

          if (draftState.isHead) {
            line.points.addBefore(point, newPoint);
          } else {
            line.points.addAfter(point, newPoint);
          }
        };

        if (draftState.direction === 'vertical') {
          if (Math.abs(delta.x) >= BREAKPOINT) {
            if (!newHead) createHead();
          } else {
            if (newHead) line.points.remove(newHead);
          }

          point.setY(newY);
        } else {
          if (Math.abs(delta.y) >= BREAKPOINT) {
            if (!newHead) createHead();
          } else {
            if (newHead) line.points.remove(newHead);
          }
          point.setX(newX);
        }
      }

      activeMoveableObject.updatePointerControllerUI();

      activeMoveableObject.updateUI();
    },
    [line, draftState, activeMoveableObject],
  );

  if (!anchorRef) return null;

  return (
    <>
      <DndContext
        onDragStart={onStartDragHead}
        onDragMove={onHeadDragMove}
        onDragEnd={() => setDraftState(undefined)}
        modifiers={[scaledDndModifiers]}
      >
        {startPoint && (
          <DndDraggable id={startPoint.id} x={startPoint.x} y={startPoint.y}>
            <div
              data-no-selecto="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'red',
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
          </DndDraggable>
        )}
        {endPoint && (
          <DndDraggable id={endPoint.id} x={endPoint.x} y={endPoint.y}>
            <div
              data-no-selecto="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'red',
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
          </DndDraggable>
        )}
      </DndContext>

      <DndContext
        onDragStart={onDragBridgePointStart}
        onDragMove={onDragBridgePointMove}
        onDragEnd={() => {
          setDraftState(undefined);
          line.mergeStraightLine();
        }}
        modifiers={[moveStraightOnly, scaledDndModifiers]}
      >
        {linePositions?.length > 1 &&
          linePositions?.map(pos => (
            <DndDraggable
              key={pos.endId + pos.startId}
              id={pos.startId + ',' + pos.endId}
              x={(pos.x1 + pos.x2) / 2}
              y={(pos.y1 + pos.y2) / 2}
            >
              <div
                data-no-selecto="true"
                data-direction={pos.y2 === pos.y1 ? 'y' : 'x'}
                className={twMerge(
                  'bg-red-500 rounded-md -translate-x-1/2 -translate-y-1/2',
                  {
                    'w-[20px] h-[5px] ': pos.y2 === pos.y1,
                    'w-[5px] h-[20px] ': pos.x2 === pos.x1,
                  },
                )}
              ></div>
            </DndDraggable>
          ))}
      </DndContext>
    </>
  );
};

export const MovableLineController: React.FC<
  MovableLineControllerProps
> = () => {
  useForceReloadLineController();

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
