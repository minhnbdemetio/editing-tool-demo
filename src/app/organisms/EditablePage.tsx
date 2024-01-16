'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { withCurrentPage } from '../hocs/withCurrentPage';
import { MoveableObjectElement } from '../atoms/moveables/MoveableObjectElement';
import { CuttingZoneReminder } from '../molecules/CuttingZoneReminder';
import {
  useAddObjectToActivePage,
  useCurrentPageObjects,
} from '../hooks/usePageObjects';
import { useActivePage } from '../store/active-page';
import { MovableLineController } from '../molecules/MovableLineController';
import { usePageSize } from '../store/use-page-size';
import { Button } from '@nextui-org/react';
import { MoveablePhoto } from '../factories/MoveablePhoto';

export interface EditablePageProps {
  pageId: string;
}

const DEFAULT_PAGE_SCALE = 1;

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const [pageObjects] = useCurrentPageObjects();

  const { setActivePage } = useActivePage();
  const { workingWidthPixels, workingHeightPixels } = usePageSize();

  useEffect(() => {
    setActivePage(pageId);
  }, [pageId, setActivePage]);

  const [scale, setScale] = useState(DEFAULT_PAGE_SCALE);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const containerWidth = containerRef.current?.clientWidth;
    const containerHeight = containerRef.current?.clientHeight;
    if (containerWidth && containerHeight) {
      setScale(containerWidth / workingWidthPixels);
      if (layerRef.current) {
        layerRef.current.style.width = `${containerWidth}px`;
        layerRef.current.style.height = `${
          (containerWidth * workingHeightPixels) / workingWidthPixels
        }px`;
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', () => {
      handleResize();
    });
  }, []);


  

  return (
    <CuttingZoneReminder>
      <div onMouseDown={() => setActivePage(pageId)} ref={containerRef}>
        <div className="relative" ref={layerRef}>
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
              width: `${workingWidthPixels}px`,
              height: `${workingHeightPixels}px`,
            }}
            ref={pageRef}
            id={pageId}
            className="bg-white relative"
          >
            {pageObjects.map(pageObject => (
              <div key={pageObject.id}>
                <MoveableObjectElement object={pageObject} />
              </div>
            ))}

            <MovableLineController />
          </div>
        </div>
      </div>
    </CuttingZoneReminder>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
