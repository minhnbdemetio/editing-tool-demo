'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { withCurrentPage } from '../hocs/withCurrentPage';

import { Button } from '@nextui-org/react';
import { MoveableObject } from '../factories/MoveableObject';
import { MoveableRectangleObject } from '../factories/MoveableRectangle';
import { MoveableObjectElement } from '../atoms/moveables/MoveableObjectElement';
import { MoveableTextObject } from '../factories/MoveableText';

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const [elements, setElements] = useState<MoveableObject[]>([]);

  const handleCreateRec = () => {
    const rec = new MoveableRectangleObject();
    pageRef.current?.appendChild(rec.createElement());
    setElements([...elements, rec]);
  };

  const handleCreateSpan = () => {
    const rec = new MoveableTextObject();
    pageRef.current?.appendChild(rec.createElement('heheheloloo'));
    setElements([...elements, rec]);
  };

  const handleExport = () => {
    const data = elements.map(object => {
      return {
        htmlString: object.exportString(),
        id: object.id,
        type: object.type,
      };
    });
    console.log({ data });
  };

  const handleImport = () => {
    const objects = {
      data: [
        {
          htmlString:
            '<div id="0b304ab2-9cd0-4586-9f08-6e49805b3a81" style="width: 132px; height: 132px; background-color: blue; position: absolute; transform: translate(738.262px, 22.035px);"></div>',
          id: '0b304ab2-9cd0-4586-9f08-6e49805b3a81',
          type: 'rectangle',
        },
        {
          htmlString:
            '<div id="12caa999-24ee-4b4d-8535-d5da163fa7a6" style="width: 98px; position: absolute; transform: translate(396.805px, 233.617px); height: 30px;"><span>heheheloloo</span></div>',
          id: '12caa999-24ee-4b4d-8535-d5da163fa7a6',
          type: 'text',
        },
        {
          htmlString:
            '<div id="8ab1bbac-31b9-41a4-b369-8448aecb127b" style="width: 99px; position: absolute; transform: translate(341.344px, 90.4805px); height: 30px;"><span>heheheloloo</span></div>',
          id: '8ab1bbac-31b9-41a4-b369-8448aecb127b',
          type: 'text',
        },
      ],
    };
    const res = objects.data.map(object => {
      let rec;
      if (object.type === 'rectangle') {
        rec = new MoveableRectangleObject();
      } else {
        rec = new MoveableTextObject();
      }
      rec.setId(object.id);
      rec.setHtmlString(object.htmlString);
      const el = rec.createElementFromString();
      if (el) {
        pageRef.current?.appendChild(el);
      }
      return rec;
    });
    setElements(res);
  };

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const containerWidth = containerRef.current?.clientWidth;
      if (containerWidth) {
        setScale(containerWidth / 1920);
      }
    });
  });

  return (
    <div ref={containerRef} className="w-full aspect-video">
      <div
        style={{ transform: `scale(${scale})` }}
        ref={pageRef}
        className="w-[1920px] h-[1080px] bg-white relative"
      >
        <Button onClick={() => handleExport()}>export</Button>
        <Button onClick={() => handleImport()}>import</Button>
        <Button onClick={() => handleCreateRec()}>create</Button>
        <Button onClick={() => handleCreateSpan()}>create span</Button>
        {elements.map(el => (
          <MoveableObjectElement
            object={el}
            key={el.id}
          ></MoveableObjectElement>
        ))}
      </div>
    </div>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
