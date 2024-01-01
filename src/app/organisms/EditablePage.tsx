'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useCurrentPageCanvas } from '../hooks/usePageCanvas';
import { fabric } from 'fabric';
import { ObjectToolbar } from '../molecules/ObjectToolbar';
import { CanvasKeyboardEventHandler } from '../atoms/CanvasKeyboardEventHandler';
import { ObjectRotator } from '../molecules/ObjectToolbar/ObjectRotator';
import { calculateToolbarPosition, getEventTarget } from '../utilities/canvas';
import { withCurrentPage } from '../hocs/withCurrentPage';
import { useActiveObject } from '../store/active-object';
import { DEFAULT_TOOLBAR_POSITION } from '../constants/canvas-constants';
import { twMerge } from '../utilities/tailwind';
import { useActivePage } from '../store/active-page';
import { useEditablePages } from '../store/editable-pages';
import { CuttingZoneReminder } from '../molecules/CuttingZoneReminder';
import { usePageSize } from '../store/use-page-size';

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = ({ pageId }) => {
  const [pageCanvas, setPageCanvas] = useCurrentPageCanvas();
  const { setActiveObject } = useActiveObject();
  const { activePage, setActivePage } = useActivePage();

  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasContainerEl = useRef<HTMLDivElement>(null);
  const toolbarEl = useRef<HTMLDivElement>(null);
  const rotatorEl = useRef<HTMLDivElement>(null);

  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({
    left: DEFAULT_TOOLBAR_POSITION,
    top: DEFAULT_TOOLBAR_POSITION,
  });
  const [rotatorPosition, setRotatorPosition] = useState({
    left: DEFAULT_TOOLBAR_POSITION,
    top: DEFAULT_TOOLBAR_POSITION,
  });

  const updateActiveObjectOnEvent = (event: fabric.IEvent<MouseEvent>) => {
    const target = getEventTarget(event);
    setActiveObject(target);
  };

  const clearActiveObject = () => {
    setActiveObject(null);
  };

  const handleShowToolBarOnEvent = (event: fabric.IEvent<MouseEvent>) => {
    setShowToolbar(true);
    const target = getEventTarget(event);
    const { rotatorLeft, rotatorTop, toolbarLeft, toolbarTop } =
      calculateToolbarPosition(target, toolbarEl, rotatorEl);

    setToolbarPosition({
      left: toolbarLeft,
      top: toolbarTop,
    });

    setRotatorPosition({
      left: rotatorLeft,
      top: rotatorTop,
    });
  };

  const handleHideToolbarOnEvent = () => {
    setShowToolbar(false);
  };

  // init canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {
      width: canvasContainerEl.current?.clientWidth,
      height: canvasContainerEl.current?.clientHeight,
    });

    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      fill: 'blue',
      borderColor: 'black',
      cornerColor: 'black',
      cornerSize: 10,
      transparentCorners: false,
      lockUniScaling: true,
      hasRotatingPoint: false,
    });

    canvas.add(rect);

    canvas.on('object:modified', event => {
      handleShowToolBarOnEvent(event);
    });

    canvas.on('selection:created', event => {
      handleShowToolBarOnEvent(event);
      updateActiveObjectOnEvent(event);
    });

    canvas.on('selection:updated', event => {
      handleShowToolBarOnEvent(event);
      updateActiveObjectOnEvent(event);
    });

    canvas.on('selection:cleared', event => {
      handleHideToolbarOnEvent();
      clearActiveObject();
    });

    canvas.on('object:moving', event => {
      handleHideToolbarOnEvent();
    });

    canvas.on('object:scaling', event => {
      handleHideToolbarOnEvent();
    });

    canvas.on('object:rotating', event => {
      handleHideToolbarOnEvent();
    });

    canvas.on('object:skewing', event => {
      handleHideToolbarOnEvent();
    });

    canvas.on('object:resizing', event => {
      handleHideToolbarOnEvent();
    });

    canvas.on('mouse:down', () => {
      setActivePage(pageId);
    });

    setPageCanvas(canvas);
    setActivePage(pageId);

    return () => {
      canvas.off();
      pageCanvas?.off();
      pageCanvas?.dispose();
      canvas.dispose();
      setPageCanvas(null);
      setActiveObject(null);
      setActivePage(null);
    };
  }, []);

  // handle resize canvas
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (canvasContainerEl.current) {
        pageCanvas?.setDimensions({
          width: canvasContainerEl.current.clientWidth,
          height: canvasContainerEl.current.clientHeight,
        });
        pageCanvas?.renderAll();
      }
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, [pageCanvas]);

  const { workingHeightPixels, workingWidthPixels } = usePageSize();

  return (
    <CuttingZoneReminder>
      <div
        style={{
          width: '100%',
          aspectRatio: workingWidthPixels / workingHeightPixels,
        }}
        ref={canvasContainerEl}
        className={twMerge(` relative bg-white `, {
          'shadow-[0_0_0_2px_#00dcf0]': pageId === activePage,
        })}
        id={pageId}
      >
        <CanvasKeyboardEventHandler />
        <canvas ref={canvasEl}></canvas>

        <ObjectToolbar
          ref={toolbarEl}
          className="absolute"
          style={{
            left: toolbarPosition.left,
            top: toolbarPosition.top,
            visibility: showToolbar ? 'initial' : 'hidden',
          }}
        />
        <ObjectRotator
          ref={rotatorEl}
          className="absolute"
          style={{
            left: rotatorPosition.left,
            top: rotatorPosition.top,
            visibility: showToolbar ? 'initial' : 'hidden',
          }}
        />

        <div></div>
      </div>
    </CuttingZoneReminder>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
