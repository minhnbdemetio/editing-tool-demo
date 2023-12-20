'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { usePageCanvas } from '../hooks/usePageCanvas';
import { fabric } from 'fabric';
import { ObjectToolbar } from '../molecules/ObjectToolbar';
import { CanvasKeyboardEventHandler } from '../atoms/CanvasKeyboardEventHandler';
import { ObjectRotator } from '../molecules/ObjectToolbar/ObjectRotator';
import {
  getToolBarHorizontalCenterPosition,
  getToolBarVerticalPosition,
} from '../utils/canvas-utils';
import { withCurrentPage } from '../hocs/withCurrentPage';

const DEFAULT_TOOLBAR_POSITION = 0;

export interface EditablePageProps {
  pageId: string;
}

const EditableCanvas: FC<EditablePageProps> = () => {
  const [pageCanvas, setPageCanvas] = usePageCanvas();

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

  const handleShowToolBarOnEvent = (event: fabric.IEvent<MouseEvent>) => {
    setShowToolbar(true);
    const target = event.selected ? event.selected[0] : event.target;
    if (!target || !toolbarEl.current || !rotatorEl.current) return;

    const toolbarLeft = getToolBarHorizontalCenterPosition(
      target,
      toolbarEl.current,
    );
    const toolbarTop = getToolBarVerticalPosition(
      target,
      toolbarEl.current,
      'top',
    );

    const rotatorLeft = getToolBarHorizontalCenterPosition(
      target,
      rotatorEl.current,
    );
    const rotatorTop = getToolBarVerticalPosition(
      target,
      toolbarEl.current,
      'bottom',
    );

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
    });

    canvas.on('selection:updated', event => {
      handleShowToolBarOnEvent(event);
    });

    canvas.on('selection:cleared', event => {
      handleHideToolbarOnEvent();
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

    setPageCanvas(canvas);

    return () => {
      canvas.off();
      pageCanvas?.off();
      pageCanvas?.dispose();
      canvas.dispose();
      setPageCanvas(null);
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

  return (
    <div
      ref={canvasContainerEl}
      className="w-full h-full relative bg-white aspect-video"
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
    </div>
  );
};

export const EditablePage = withCurrentPage(EditableCanvas);
