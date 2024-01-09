'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { withCurrentPage } from '../hocs/withCurrentPage';

import { Button } from '@nextui-org/react';
import { MoveableRectangleObject } from '../factories/MoveableRectangle';
import { MoveableObjectElement } from '../atoms/moveables/MoveableObjectElement';
import { MoveableTextObject } from '../factories/MoveableText';
import { MoveableLineObject } from '../factories/MoveableLine';
import { useActiveObject } from '../store/active-object';
import { DEFAULT_TOOLBAR_POSITION } from '../constants/canvas-constants';
import { twMerge } from '../utilities/tailwind';
import { CuttingZoneReminder } from '../molecules/CuttingZoneReminder';
import { usePageSize } from '../store/use-page-size';
import { useCurrentPageCanvas } from '../hooks/usePageCanvas';
import { LineEventHandler } from '../utilities/lineEventHandler';
import { useLineEnabled } from '../store/line-preview';
import { useCurrentPageObjects } from '../hooks/usePageObjects';
import { useActivePage } from '../store/active-page';
import {
  useCloneActiveMoveableObject,
  useDeleteActiveMoveableObject,
} from '../hooks/useActiveMoveableObject';
import { ObjectType } from '../factories/MoveableObject';
import { MoveableHeadingTextObject } from '../factories/MoveableHeadingText';
import { MovableLineController } from '../molecules/MovableLineController';

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const [objects, setObjects] = useCurrentPageObjects();

  const handleCreateRec = () => {
    const rec = new MoveableRectangleObject();
    setObjects([...objects, rec]);
  };

  const handleCreateSpan = () => {
    const text = new MoveableTextObject();
    setObjects([...objects, text]);
  };

  const handleCreateLine = () => {
    const text = new MoveableLineObject();
    text.line?.setShadow({
      shadowBlur: 1,
      shadowDirection: 0,
      shadowDistance: 10,
      shadowOpacity: 10,
    });
    setObjects([...objects, text]);
  };

  const handleExport = () => {
    const data = objects.map(object => {
      return {
        htmlString: object.exportHtmlString(),
        id: object.id,
        type: object.type,
      };
    });
    console.log({ data });
  };

  const handleImport = () => {
    // for (const object of objects) {
    //   object.destroy();
    // }
    setObjects([]);
    const dataObjects = {
      data: [
        {
          htmlString:
            '<div id="fdsafdsaf" style="width: 132px; height: 132px; background-color: blue; position: absolute; transform: translate(738.262px, 22.035px);"></div>',
          id: 'fdsafdsaf',
          type: 'rectangle' as ObjectType,
        },
        {
          htmlString:
            '<div id="ertrewerwt" style="width: 98px; position: absolute; transform: translate(396.805px, 233.617px); height: 30px;"><span>heheheloloo</span></div>',
          id: 'ertrewerwt',
          type: 'text' as ObjectType,
        },
        {
          htmlString:
            '<div id="vcxvcxzv" style="width: 99px; position: absolute; transform: translate(341.344px, 90.4805px); height: 30px;"><span>heheheloloo</span></div>',
          id: 'vcxvcxzv',
          type: 'text' as ObjectType,
        },
      ],
    };
    const res = dataObjects.data.map(object => {
      let rec;
      if (object.type === 'rectangle') {
        rec = new MoveableRectangleObject(object.id, object.htmlString);
      } else {
        rec = new MoveableTextObject(object.id, object.htmlString);
      }
      return rec;
    });
    setTimeout(() => setObjects(res));
  };

  const { setActivePage } = useActivePage();

  useEffect(() => {
    setActivePage(pageId);
  }, [pageId, setActivePage]);

  const handleAddTitle = () => {
    const text = new MoveableHeadingTextObject();
    setObjects([...objects, text]);
  };

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const containerWidth = containerRef.current?.clientWidth;
    const containerHeight = containerRef.current?.clientHeight;
    if (containerWidth && containerHeight) {
      setScale(containerWidth / 1920);
      if (layerRef.current) {
        layerRef.current.style.width = `${containerWidth}px`;
        layerRef.current.style.height = `${(containerWidth * 9) / 16}px`;
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', () => {
      handleResize();
    });
  }, []);

  const handleDeleteObject = useDeleteActiveMoveableObject();
  const handleCloneObject = useCloneActiveMoveableObject();

  return (
    <CuttingZoneReminder>
      <div id={pageId} ref={containerRef} className="w-full">
        <div className="relative" ref={layerRef}>
          <div
            style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}
            ref={pageRef}
            className="w-[1920px] h-[1080px] bg-white relative"
          >
            <Button onClick={() => handleExport()}>export to console</Button>
            <Button onClick={handleImport}>import from template</Button>
            <Button onClick={() => handleCreateRec()}>create rec</Button>
            <Button onClick={() => handleCreateSpan()}>create span</Button>
            <Button onClick={handleDeleteObject}>delete active object</Button>
            <Button onClick={handleCloneObject}>clone active object</Button>
            <Button onClick={() => handleAddTitle()}>Add title</Button>
            <Button onClick={() => handleCreateLine()}>create line</Button>
            {objects.map(el => (
              <MoveableObjectElement
                containerRef={pageRef}
                object={el}
                key={el.id}
              ></MoveableObjectElement>
            ))}

            <MovableLineController />
          </div>
        </div>
      </div>
    </CuttingZoneReminder>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
