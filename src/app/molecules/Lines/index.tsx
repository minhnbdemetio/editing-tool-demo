import React, { useCallback } from 'react';
import { Items, LineType } from './items';
import Image from 'next/image';
import { useActivePageCanvas } from '@/app/hooks/useActivePage';
import {
  createDashedLine,
  createDotsLine,
  createSolidLine,
  widthEndArrow,
} from '@/app/utilities/line';
import { SvgLine, SvgLineAdornnment } from '@/app/utilities/svg-line';
import { fabric } from 'fabric';

interface LinesProps {}

export const Lines: React.FC<LinesProps> = () => {
  const canvas = useActivePageCanvas();

  const handleClick = useCallback(
    (type: LineType) => {
      switch (type) {
        case 'solid': {
          const svgLine = new SvgLine({
            strokeWidth: 5,
            stroke: 'red',
            length: 100,
            startAdornment: SvgLineAdornnment.Arrow,
          });

          fabric.loadSVGFromString(svgLine.toSvg(), function (objects) {
            const group = fabric.util.groupSVGElements(objects);
            const line = new fabric.Group([group], {
              left: 100,
              top: 100,
              data: svgLine.toObject(),
              name: 'line',
              hasBorders: false,
              hasControls: false,
              selectable: false,
            });
            canvas?.add(line);
            canvas?.renderAll();
          });

          return;
        }
        case 'dashed': {
          const line = createDashedLine([20, 20, 100, 20], {
            stroke: 'red',
          });
          canvas?.add(line);
          canvas?.renderAll();
          return;
        }
        case 'dots': {
          const line = createDotsLine([20, 20, 100, 20], {
            stroke: 'red',
          });

          canvas?.add(line);
          canvas?.renderAll();
          return;
        }
        case 'arrow-closed': {
          console.debug('????');
          const line = widthEndArrow(
            createDotsLine([20, 20, 100, 20], {
              stroke: 'red',
            }),
          );

          canvas?.add(line);
          canvas?.renderAll();
          return;
        }
      }
    },
    [canvas],
  );

  return (
    <div>
      <p className="text-md font-normal text-[600] text-black-500">Lines</p>

      <div className="mt-1 grid grid-cols-5 gap-1">
        {Items.map(item => (
          <div
            onClick={() => handleClick(item.type)}
            key={item.type}
            className="relative h-auto aspect-square cursor-pointer"
          >
            <Image
              src={item.img}
              fill
              className="w-full h-auto  aspect-square"
              alt={item.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
