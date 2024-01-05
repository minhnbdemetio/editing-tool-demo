'use client';

import { FC, useEffect, useRef, useState, createRef, RefObject } from 'react';
import { withCurrentPage } from '../hocs/withCurrentPage';
import { MoveableRectangle } from '../atoms/moveables/Rectangle';
import { usePageMoveableObjects } from '../store/page-moveable-objects';
import { Button } from '@nextui-org/react';

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const { pageObjects, setPageObjects } = usePageMoveableObjects();
  const currentPageObjects = pageObjects[pageId] || [];
  const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  const arrLength = 1;

  useEffect(() => {
    // add or remove refs
    setElRefs(elRefs =>
      Array(arrLength)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef<HTMLDivElement>()),
    );
  }, [arrLength]);

  useEffect(() => {
    // let index = 0;
    // const generateKey = () => {
    //   index++;
    //   return pageId + index;
    // };
    setPageObjects(pageId, [...currentPageObjects, ...elRefs]);
  }, [elRefs]);

  const handleExport = () => {
    const data = currentPageObjects.map(object => {
      const width = object.current?.clientWidth;
      const height = object.current?.clientHeight;
      const transform = object.current?.style.transform;
      const cloned = object.current?.cloneNode(true);
      console.log(cloned);
      if (cloned) {
        pageRef.current?.appendChild(cloned);
      }
      return object.current;
    });
    console.log({ data });
  };

  // const [containerWidth, setContainerWidth] = useState(0);
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
        <Button onClick={handleExport}>export</Button>
        {currentPageObjects?.map((ref, index) => (
          <MoveableRectangle key={index} ref={ref} />
        ))}
      </div>
    </div>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
