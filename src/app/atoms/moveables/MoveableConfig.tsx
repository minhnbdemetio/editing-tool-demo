import { MOVEABLE_TARGET_CLASS, DATA_LOCKED } from '@/app/constants/moveable';
import { SELECTO_ID, EDITOR_CONTAINER_ID } from '@/app/organisms/Editor';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { useDesign } from '@/app/store/design-objects';
import { updateHeadControllerPosition } from '@/app/utilities/line';
import { isElementLocked, isLine } from '@/app/utilities/moveable';
import { FC, useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import Selecto from 'react-selecto';

export const MoveableConfig: FC = () => {
  const { moveableTargets, setMoveableTargets, getAllObjects, setMovable } =
    useDesign();
  const { activeMoveableObject, setActiveMoveableObject } =
    useActiveMoveableObject();
  const moveableRef = useRef<Moveable | null>(null);

  // TODO: Set global moveable ref if needed
  useEffect(() => {
    setMovable(moveableRef.current);
  }, [setMovable, moveableTargets]);

  const findAndSetActiveObject = (objectId: string) => {
    const allObjects = getAllObjects();
    const objectWithId = allObjects.find(object => object.id === objectId);
    setActiveMoveableObject(objectWithId);
  };

  return (
    <>
      <div id={SELECTO_ID}>
        <Selecto
          dragContainer={window}
          selectableTargets={[`.${MOVEABLE_TARGET_CLASS}`]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={true}
          toggleContinueSelect={['shift']}
          ratio={0}
          onDragStart={e => {
            const target = e.inputEvent.target;
            if (target.getAttribute(DATA_LOCKED) === 'true') return;
            if (moveableRef.current!.isMoveableElement(target)) {
              e.preventDrag();
            }
          }}
          onSelectEnd={e => {
            const isClickInsideEditorContainer = document
              .getElementById(EDITOR_CONTAINER_ID)
              ?.contains(e.inputEvent.target);

            if (isClickInsideEditorContainer) {
              setMoveableTargets(e.selected);
            }
          }}
        />
      </div>
      <Moveable
        ref={moveableRef}
        target={moveableTargets}
        draggable
        resizable
        snappable
        keepRatio
        rotatable
        snapGridWidth={50}
        onDragStart={e => {
          if (isElementLocked(e.target)) return;
          if (isLine(activeMoveableObject)) {
            const matrix = new WebKitCSSMatrix(e.target.style.transform);

            activeMoveableObject.dragStartPoint = {
              x: matrix.m41,
              y: matrix.m42,
            };
            activeMoveableObject.setDragging(true);

            updateHeadControllerPosition(activeMoveableObject, true);
          }
        }}
        onDragEnd={e => {
          if (isElementLocked(e.target)) return;
          var matrix = new WebKitCSSMatrix(e.target.style.transform);

          if (isLine(activeMoveableObject)) {
            const xChanged = matrix.m41 - activeMoveableObject.dragStartPoint.x;
            const yChanged = matrix.m42 - activeMoveableObject.dragStartPoint.y;

            activeMoveableObject.line?.moveAllPoints({
              x: xChanged,
              y: yChanged,
            });
            activeMoveableObject.setDragging(false);
            updateHeadControllerPosition(activeMoveableObject);
          }
        }}
        onDrag={e => {
          if (isElementLocked(e.target)) return;
          e.target.style.transform = e.transform;
        }}
        onRotate={e => {
          if (isElementLocked(e.target)) return;
          e.target.style.transform = e.transform;
        }}
        onResize={e => {
          if (isElementLocked(e.target)) return;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
        }}
        onScale={e => {
          if (isElementLocked(e.target)) return;
          e.target.style.transform = e.drag.transform;
        }}
        onRender={e => {
          if (isElementLocked(e.target)) return;
          e.target.style.cssText += e.cssText;
        }}
        onRenderGroup={e => {
          e.events.forEach(ev => {
            if (isElementLocked(e.target)) return;
            ev.target.style.cssText += ev.cssText;
          });
        }}
        onChangeTargets={e => {
          // TODO: Implement multiple active object when using group
          if (e.targets.length) {
            findAndSetActiveObject(e.targets[0].id);
          } else {
            setActiveMoveableObject(null);
          }
        }}
      />
    </>
  );
};
