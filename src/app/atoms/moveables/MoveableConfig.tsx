import { MOVEABLE_TARGET_CLASS, DATA_LOCKED } from '@/app/constants/moveable';
import { BottomToolbar } from '@/app/molecules/ObjectToolbar/BottomToolbar';
import { TopToolbar } from '@/app/molecules/ObjectToolbar/TopToolbar';
import { SELECTO_ID, EDITOR_CONTAINER } from '@/app/organisms/Editor';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { useDesign } from '@/app/store/design-objects';
import { isElementLocked, isLine, isPhoto } from '@/app/utilities/moveable';
import { FC, useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import Selecto from 'react-selecto';

export const MoveableConfig: FC = () => {
  const {
    moveableTargets,
    setMoveableTargets,
    getAllObjects,
    setMovable,
  } = useDesign();
  const {
    activeMoveableObject,
    setActiveMoveableObject,
  } = useActiveMoveableObject();
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
          dragContainer={`.${EDITOR_CONTAINER}`}
          selectableTargets={[`.${MOVEABLE_TARGET_CLASS}`]}
          hitRate={0}
          checkInput
          preventDefault
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
              .getElementById(EDITOR_CONTAINER)
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
        ables={[BottomToolbar, TopToolbar]}
        props={{
          topToolbar: true,
          bottomToolbar: true,
        }}
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

            activeMoveableObject.updateHeadControl();
          }
          if (isPhoto(activeMoveableObject)) {
            const matrix = new WebKitCSSMatrix(e.target.style.transform);
            activeMoveableObject.dragStartPoint = {
              x: matrix.m41,
              y: matrix.m42,
            };
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
            activeMoveableObject.updateHeadControl();
          }
          if (isPhoto(activeMoveableObject)) {
            const xChanged =
              matrix.m41 - activeMoveableObject.dragStartPoint!.x;
            const yChanged =
              matrix.m42 - activeMoveableObject.dragStartPoint!.y;
            activeMoveableObject.updateCropPosition(xChanged, yChanged);
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

          if (isPhoto(activeMoveableObject)) {
            activeMoveableObject.setWidth(e.width);
            activeMoveableObject.setHeight(e.height);
            activeMoveableObject.renderFilter();
          }

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