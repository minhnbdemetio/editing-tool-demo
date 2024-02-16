import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useActivePhotoObject } from '../hooks/useActiveMoveableObject';
import { useImageCropping } from '../store/image-cropping';
import { createPortal } from 'react-dom';
import { useDesign } from '../store/design-objects';
import { useActivePage } from '../store/active-page';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { Draggable } from '../atoms/DndDraggable';

interface MovableImageCropperProps {}

const POINTER_SIZE = 10;

export const MovableImageCropper: React.FC<MovableImageCropperProps> = () => {
  const photoActive = useActivePhotoObject();

  const isCropping = useImageCropping(s => s.isCropping);
  const setCropping = useImageCropping(s => s.setCropping);
  const activePageId = useActivePage(s => s.activePage);

  const pageScale = useDesign(s => s.scale);
  const moveable = useDesign(s => s.moveable);

  const { width, height, x, y } = useMemo(() => {
    const container = document.getElementById(activePageId || '');

    if (!photoActive || !container || !isCropping)
      return { width: 0, height: 0, x: 0, y: 0 };

    photoActive?.openCrop();
    const boundingRect = container.getBoundingClientRect();

    const { height, width } = photoActive.getOriginalSizeByCropPosition();
    const { x, y } = photoActive.getOriginalPositionByCropPosition();

    process.nextTick(() => {
      moveable?.updateRect();
    });

    return {
      width: width * pageScale,
      height: height * pageScale,
      x: x * pageScale + boundingRect.x,
      y: y * pageScale + boundingRect.y,
    };
  }, [pageScale, photoActive, activePageId, isCropping, moveable]);

  const [position, setPosition] = useState<{
    [key: string]: {
      x: number;
      y: number;
    };
  }>({
    tl: { x: 0, y: 0 },
    tr: { x: 0, y: 0 },
    bl: { x: 0, y: 0 },
    br: { x: 0, y: 0 },
  });

  const renderCropMask = useCallback(
    (
      tl: { x: number; y: number },
      tr: {
        x: number;
        y: number;
      },
      bl: {
        x: number;
        y: number;
      },
    ) => {
      if (photoActive) {
        const x = tl.x < tr.x ? tl.x : tr.x;
        const y = tl.y < bl.y ? tl.y : bl.y;

        const xRate = x / width;
        const yRate = y / height;
        const widthRate = Math.abs(tr.x - tl.x) / width;
        const heightRate = Math.abs(bl.y - tl.y) / height;

        photoActive?.renderCropMask({
          x: xRate,
          y: yRate,
          width: widthRate,
          height: heightRate,
        });
      }
    },
    [height, photoActive, width],
  );

  useEffect(() => {
    const element = document.querySelector('.moveable-control-box');
    if (!element) return;

    if (isCropping && photoActive) {
      const cropPosition = photoActive.cropPosition;
      let tl: { x: number; y: number };
      let tr: { x: number; y: number };
      let bl: { x: number; y: number };

      if (cropPosition) {
        const x = cropPosition.x * width;
        const y = cropPosition.y * height;
        const cropWidth = cropPosition.width * width;
        const cropHeight = cropPosition.height * height;

        tl = { x: x, y: y };
        tr = { x: x + cropWidth, y: y };
        bl = { x: x, y: y + cropHeight };

        setPosition({
          tl,
          tr,
          bl,
          br: {
            x: x + cropWidth,
            y: y + cropHeight,
          },
        });
      } else {
        tl = { x: 0, y: 0 };
        tr = { x: width, y: 0 };
        bl = { x: 0, y: height };
        setPosition({
          tl,
          tr,
          bl,
          br: {
            x: width,
            y: height,
          },
        });
      }

      renderCropMask(tl, tr, bl);
    }
  }, [isCropping, height, width, photoActive, renderCropMask]);

  if (!isCropping) return null;

  return createPortal(
    <>
      <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-10 z-10"></div>
      <div
        style={{
          width: width + POINTER_SIZE,
          height: height + POINTER_SIZE,
          left: x - POINTER_SIZE / 2,
          top: y - POINTER_SIZE / 2,
          position: 'absolute',
          zIndex: 20,
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ padding: POINTER_SIZE / 2 }}
        >
          <DndContext
            modifiers={[restrictToParentElement]}
            onDragMove={({ delta, active }) => {
              setPosition(s => {
                const x = s[active.id].x + delta.x;
                const y = s[active.id].y + delta.y;
                let tl: { x: number; y: number };
                let bl: { x: number; y: number };
                let tr: { x: number; y: number };

                switch (active.id) {
                  case 'tr':
                    tl = { ...s.tl, y };
                    renderCropMask(tl, { x, y }, s.bl);

                    return {
                      ...s,
                      br: { ...s.br, x },
                      tl,
                    };
                  case 'bl':
                    tl = { ...s.tl, x };
                    renderCropMask(tl, s.tr, { x, y });

                    return {
                      ...s,
                      tl,
                      br: { ...s.br, y },
                    };
                  case 'br':
                    bl = { ...s.bl, y };
                    tr = { ...s.tr, x };
                    renderCropMask(s.tl, tr, bl);
                    return {
                      ...s,
                      tr,
                      bl,
                    };
                  default:
                    bl = { ...s.bl, x };
                    tr = { ...s.tr, y };
                    renderCropMask({ x, y }, tr, bl);
                    return {
                      ...s,
                      bl,
                      tr,
                    };
                }
              });
            }}
            onDragEnd={({ delta, active }) => {
              switch (active.id) {
                case 'tl': {
                  setPosition(s => {
                    const x = s.tl.x + delta.x;
                    const y = s.tl.y + delta.y;

                    return {
                      ...s,
                      tl: { x, y },
                    };
                  });

                  break;
                }
                case 'tr': {
                  setPosition(s => ({
                    ...s,
                    tr: { x: s.tr.x + delta.x, y: s.tr.y + delta.y },
                  }));

                  break;
                }
                case 'br': {
                  setPosition(s => ({
                    ...s,
                    br: { x: s.br.x + delta.x, y: s.br.y + delta.y },
                  }));

                  break;
                }
                case 'bl': {
                  setPosition(s => ({
                    ...s,
                    bl: { x: s.bl.x + delta.x, y: s.bl.y + delta.y },
                  }));

                  break;
                }
              }
            }}
          >
            <Draggable id="tl" x={position.tl.x} y={position.tl.y}>
              <div
                className={`w-[${POINTER_SIZE}px] h-[${POINTER_SIZE}px] bg-red-500`}
              ></div>
            </Draggable>
            <Draggable id="tr" x={position.tr.x} y={position.tr.y}>
              <div
                className={`w-[${POINTER_SIZE}px] h-[${POINTER_SIZE}px] bg-red-500`}
              ></div>
            </Draggable>
            <Draggable id="bl" x={position.bl.x} y={position.bl.y}>
              <div
                className={`w-[${POINTER_SIZE}px] h-[${POINTER_SIZE}px] bg-red-500`}
              ></div>
            </Draggable>
            <Draggable id="br" x={position.br.x} y={position.br.y}>
              <div
                className={`w-[${POINTER_SIZE}px] h-[${POINTER_SIZE}px] bg-red-500`}
              ></div>
            </Draggable>
          </DndContext>

          <div className="absolute bottom-0 translate-y-full -translate-x-1/2 left-1/2 flex gap-[10px]">
            <button
              onClick={() => {
                if (photoActive) {
                  const { tl, bl, br, tr } = position;

                  const x = tl.x < tr.x ? tl.x : tr.x;
                  const y = tl.y < bl.y ? tl.y : bl.y;
                  const xRate = x / width;
                  const yRate = y / height;
                  const widthRate = Math.abs(tr.x - tl.x) / width;
                  const heightRate = Math.abs(bl.y - tl.y) / height;

                  photoActive?.crop({
                    x: xRate,
                    y: yRate,
                    width: widthRate,
                    height: heightRate,
                  });
                  setCropping(false);

                  process.nextTick(() => {
                    moveable?.updateRect();
                  });
                }
              }}
            >
              Crop
            </button>
            <button
              onClick={() => {
                photoActive?.rejectCrop();
                setCropping(false);

                process.nextTick(() => {
                  moveable?.updateRect();
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector('body') as any,
  );
};
