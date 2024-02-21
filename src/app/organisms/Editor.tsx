'use client';

import { FC, useCallback, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { EditablePage } from './EditablePage';
import { useDrop } from 'react-dnd';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { MoveableConfig } from '../atoms/moveables/MoveableConfig';
import { useAddPage, usePages } from '../hooks/usePage';
import { useActivePage } from '../store/active-page';
import { twMerge } from '../utilities/tailwind';
import { Add } from '@/app/icons';
import { useImageCropping } from '../store/image-cropping';
import axios from 'axios';
import { MoveableTextObject } from '../lib/moveable/text/MoveableText';
import { MoveablePhoto } from '../lib/moveable/photo/MoveablePhoto';
import { useDesign } from '../store/design-objects';
import { usePageSize } from '../store/use-page-size';
import { MoveableObject } from '../lib/moveable/MoveableObject';

export const SELECTO_ID = 'editor-selecto';
export const EDITOR_CONTAINER = 'editor-container';

export const Editor: FC = () => {
  const pages = usePages();
  const addPage = useAddPage();
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const { update } = usePageSize();

  const isCropping = useImageCropping(s => s.isCropping);

  const handleAddPage = useCallback(() => {
    addPage([]);
  }, [addPage]);

  const [{}, drop] = useDrop(() => ({
    accept: 'template',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // useEffect(() => {
  //   if (!pages.length) {
  //     handleAddPage();
  //   }
  // }, [pages, handleAddPage]);

  useEffect(() => {
    const loadFromPDF = async () => {
      const extractionRes = await axios.post(
        'http://127.0.0.1:5000/extract',
        {},
        { headers: {} },
      );
      const pages = extractionRes.data as any;

      for (const page of pages) {
        const pageText = page.text;
        const pageImages = page.images;
        const pageObjects: MoveableObject[] = [];
        for (const extractedText of pageText) {
          pageObjects.push(
            new MoveableTextObject({
              text: extractedText.text,
              x: extractedText.x0,
              y: extractedText.y0,
              textStyle: {
                fontSize: extractedText.size,
              },
              fontFamily: extractedText.font,
              color: extractedText.color,
            }),
          );
        }
        for (const image of pageImages) {
          pageObjects.push(
            new MoveablePhoto({
              src: `data:image/png;base64,${image.data}`,
              x: image.x0,
              y: image.y0,
              width: image.width,
              height: image.height,
            }),
          );
        }
        addPage(pageObjects);
      }

      const firstPage = pages[0];
      update({
        workingWidthPixels: firstPage.info.width,
        workingHeightPixels: firstPage.info.height,
      });
    };
    loadFromPDF();
  }, []);

  return (
    <div
      ref={drop}
      id={EDITOR_CONTAINER}
      data-active-element-type={activeMoveableObject?.type}
      data-image-cropping={isCropping}
      className={`bg-[#F1F2F4] p-10 ${EDITOR_CONTAINER} min-h-full`}
    >
      {/* <div className="text-right mb-3">
        <LinePreviewToggle />
      </div> */}
      <div className="w-full flex justify-center">
        <div className="max-w-[640px] w-full">
          <div className="flex flex-col gap-10 h-full">
            {pages.map(pageId => (
              <div
                className={twMerge('editable-page', {
                  'border-cyan-500 border-1': activePage === pageId,
                })}
                key={pageId}
              >
                <EditablePage pageId={pageId} />
              </div>
            ))}
          </div>
          <Button
            color="default"
            className={twMerge('w-full hidden', 'desktop:flex')}
            startContent={<Add />}
            onClick={handleAddPage}
          >
            Add page
          </Button>
        </div>
      </div>
      <MoveableConfig />
    </div>
  );
};
