'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withCurrentPage } from '../hocs/withCurrentPage';
import { MoveableObjectElement } from '../atoms/moveables/MoveableObjectElement';
import { CuttingZoneReminder } from '../molecules/CuttingZoneReminder';
import {
  useAddObjectToPage,
  useCurrentPageObjects,
} from '../hooks/usePageObjects';
import { useActivePage } from '../store/active-page';
import { MovableLineController } from '../molecules/MovableLineController';
import { usePageSize } from '../store/use-page-size';
import { useDesign } from '../store/design-objects';
import { MovableImageCropper } from '../molecules/MovableImageCropper';

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const [pageObjects] = useCurrentPageObjects();
  const addObjectToActivePage = useAddObjectToPage(pageId);

  const { setActivePage, activePage } = useActivePage();
  const { workingWidthPixels, workingHeightPixels, update } = usePageSize();

  useEffect(() => {
    setActivePage(pageId);
  }, [pageId, setActivePage]);

  const isActive = useMemo(() => activePage === pageId, [pageId, activePage]);

  const { scale, setScale } = useDesign();
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
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
  }, [setScale, workingHeightPixels, workingWidthPixels]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', () => {
      handleResize();
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <CuttingZoneReminder>
      <div onMouseDown={() => setActivePage(pageId)} ref={containerRef}>
        <div className="relative overflow-hidden" ref={layerRef}>
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

            {isActive && (
              <>
                <MovableLineController />
                <MovableImageCropper />
              </>
            )}
          </div>
        </div>
      </div>
    </CuttingZoneReminder>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
