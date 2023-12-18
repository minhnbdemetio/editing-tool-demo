'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { useCurrentCanvas } from '../hooks/contexts/useCurrentCanvas';
import { fabric } from 'fabric';
import { ObjectToolbar } from '../molecules/ObjectToolbar';
import { CanvasKeyboardEventHandler } from '../atoms/CanvasKeyboardEventHandler';

export const Canvas: FC = () => {
  const { currentCanvas, setCurrentCanvas } = useCurrentCanvas();
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasContainerEl = useRef<HTMLDivElement>(null);

  const BUTTON_HEIGHT = 30;
  const [hasActiveObject, setHasActiveObject] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ left: 0, top: 0 });

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

    canvas.on('selection:created', event => {
      setHasActiveObject(true);

      const selectedObject = event.selected ? event.selected[0] : null;

      const left = selectedObject?.getBoundingRect().left;
      const top = selectedObject?.getBoundingRect().top;

      if (left && top) {
        setToolbarPosition({ left, top });
      }
    });

    canvas.on('selection:updated', event => {
      setHasActiveObject(true);

      const selected = event.selected ? event.selected[0] : null;
      const left = selected?.getBoundingRect().left;
      const top = selected?.getBoundingRect().top;

      if (left && top) {
        setToolbarPosition({ left, top });
      }
    });

    canvas.on('object:moving', event => {
      setHasActiveObject(true);
      const left = event.target?.getBoundingRect().left;
      const top = event.target?.getBoundingRect().top;
      if (left && top) {
        setToolbarPosition({ left, top });
      }
    });

    canvas.on('selection:cleared', () => {
      setHasActiveObject(false);
    });
    setCurrentCanvas(canvas);

    return () => {
      currentCanvas?.dispose();
      canvas.dispose();
      setCurrentCanvas(null);
    };
  }, []);

  // handle resize canvas
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (canvasContainerEl.current) {
        currentCanvas?.setDimensions({
          width: canvasContainerEl.current.clientWidth,
          height: canvasContainerEl.current.clientHeight,
        });
        currentCanvas?.renderAll();
      }
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, [currentCanvas]);

  return (
    <div ref={canvasContainerEl} className="w-full h-full relative">
      <CanvasKeyboardEventHandler />
      <canvas ref={canvasEl}></canvas>
      {hasActiveObject && (
        <ObjectToolbar
          className="absolute"
          style={{ left: toolbarPosition.left, top: toolbarPosition.top }}
        />
      )}
    </div>
  );
};
