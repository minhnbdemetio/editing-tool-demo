'use client';

import { FC, useEffect, useRef } from 'react';
import { Button } from '../atoms/Button';
import { EditablePage } from './EditablePage';
import { useEditablePages } from '../store/editable-pages';
import { LinePreviewToggle } from '../molecules/LinePreviewToggle';
import { useDrop } from 'react-dnd';
import Moveable from 'react-moveable';
import Selecto from 'react-selecto';
import { useDesign } from '../store/design-objects';
import { MOVEABLE_TARGET_CLASS } from '../constants/moveable';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useDeleteObjetCommand } from '../hooks/editor-commands/useActiveMoveableObjectCommand';

export const SELECTO_ID = 'editor-selecto';
export const EDITOR_CONTAINER_ID = 'editor-container';

export const Editor: FC = () => {
  const { pages, addBlankPage } = useEditablePages();
  const { moveableTargets, setMoveableTargets, getAllObjects, setMovable } =
    useDesign();
  const { setActiveMoveableObject } = useActiveMoveableObject();
  const moveableRef = useRef<Moveable | null>(null);
  const handleAddPage = () => {
    const randomId = new Date().getTime();
    addBlankPage(randomId + '');
  };

  const [{}, drop] = useDrop(() => ({
    accept: 'template',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // TODO: Set global moveable ref if needed
  useEffect(() => {
    setMovable(moveableRef.current);
  }, [setMovable, moveableTargets]);
  //   const initialMoveable = new Moveable(
  //     document.getElementById(EDITOR_CONTAINER_ID)!,
  //     {
  //       target: moveableTargets,
  //       draggable: true,
  //       scalable: true,
  //       keepRatio: true,
  //       rotatable: true,
  //       resizable: true,
  //     },
  //   );
  //   initialMoveable.on('drag', e => {
  //     e.target.style.transform = e.transform;
  //   });
  //   initialMoveable.on('rotate', e => (e.target.style.transform = e.transform));
  //   initialMoveable.on('resize', e => {
  //     e.target.style.width = `${e.width}px`;
  //     e.target.style.height = `${e.height}px`;
  //     e.target.style.transform = e.drag.transform;
  //   });
  //   initialMoveable.on(
  //     'scale',
  //     e => (e.target.style.transform = e.drag.transform),
  //   );
  //   setMovable(initialMoveable);
  // }, [moveableTargets, setMovable]);

  const findAndSetActiveObject = (objectId: string) => {
    const allObjects = getAllObjects();
    const objectWithId = allObjects.find(object => object.id === objectId);
    setActiveMoveableObject(objectWithId);
  };

  const deleteObjectCommand = useDeleteObjetCommand();

  return (
    <div ref={drop} id={EDITOR_CONTAINER_ID} className="bg-gray-200 p-10">
      <div className="text-right mb-3">
        <LinePreviewToggle />
      </div>
      <Button onClick={deleteObjectCommand}>Delete active object </Button>
      <div className="flex flex-col gap-10 h-full">
        {Object.entries(pages).map(([pageId]) => (
          <div key={pageId}>
            <EditablePage pageId={pageId} />
          </div>
        ))}
      </div>
      <Button className="mt-10" onClick={handleAddPage}>
        +Add page
      </Button>
      <div id={SELECTO_ID}>
        <Selecto
          dragContainer={window}
          selectableTargets={[`.${MOVEABLE_TARGET_CLASS}`]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={true}
          toggleContinueSelect={['shift']}
          ratio={0}
          onSelectEnd={e => {
            setMoveableTargets(e.selected);
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
        onDrag={e => {
          e.target.style.transform = e.transform;
        }}
        onRotate={e => {
          e.target.style.transform = e.transform;
        }}
        onResize={e => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
        }}
        onScale={e => (e.target.style.transform = e.drag.transform)}
        onRender={e => {
          e.target.style.cssText += e.cssText;
        }}
        onRenderGroup={e => {
          e.events.forEach(ev => {
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
    </div>
  );
};
