import React, { useCallback } from 'react';
import { Items, LineType } from './items';
import Image from 'next/image';

import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveableLineObject } from '@/app/lib/moveable/MoveableLine';
import { SvgLineAdornment } from '@/app/utilities/line/Interface.Line';
import { StrokeDashArraySizes } from '@/app/utilities/Svg.interfaces';
import { ArrowAdornment } from '@/app/utilities/line/adornment/ArrowAdornment';
import { LineAdornment } from '@/app/utilities/line/adornment/LineAdornment';
import { TriangleAdornment } from '@/app/utilities/line/adornment/TriangleAdornment';
import { CircleAdornment } from '@/app/utilities/line/adornment/CircleAdornment';
import { RhombusAdornment } from '@/app/utilities/line/adornment/RhombusAdornment';
import { SquareAdornment } from '@/app/utilities/line/adornment/SquareAdornment';

interface LinesProps {}

export const Lines: React.FC<LinesProps> = () => {
  const addObjectToActivePage = useAddObjectToActivePage();

  const handleClick = useCallback(
    (type: LineType) => {
      switch (type) {
        case 'solid': {
          addObjectToActivePage(new MoveableLineObject());
          return;
        }
        case 'arrow-closed': {
          addObjectToActivePage(
            new MoveableLineObject({
              svgLineOptions: {
                startAdornment: new ArrowAdornment(),
                endAdornment: new ArrowAdornment(),
              },
            }),
          );
          return;
        }
        case 'closed': {
          addObjectToActivePage(
            new MoveableLineObject({
              svgLineOptions: {
                startAdornment: new LineAdornment({ outline: false }),
                endAdornment: new LineAdornment({ outline: false }),
              },
            }),
          );
          return;
        }
        case 'dashed': {
          const object = new MoveableLineObject();
          object.line.setStrokeDashArray(StrokeDashArraySizes.Medium);
          addObjectToActivePage(object);
          return;
        }
        case 'dots': {
          const object = new MoveableLineObject();
          object.line.setStrokeDashArray(StrokeDashArraySizes.Small);
          addObjectToActivePage(object);
          return;
        }
        case 'dots-closed-triangle': {
          const object = new MoveableLineObject();
          object.line.setStrokeDashArray(StrokeDashArraySizes.Small);
          object.line.setStartAdornment(
            new TriangleAdornment({ outline: false }),
          );
          object.line.setEndAdornment(
            new TriangleAdornment({ outline: false }),
          );
          addObjectToActivePage(object);
          return;
        }
        case 'dots-end-arrow': {
          const object = new MoveableLineObject();
          object.line.setStrokeDashArray(StrokeDashArraySizes.Small);
          object.line.setEndAdornment(new ArrowAdornment({ outline: false }));
          addObjectToActivePage(object);
          return;
        }
        case 'end-arrow': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new ArrowAdornment({ outline: false }));
          addObjectToActivePage(object);
          return;
        }
        case 'end-triangle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(
            new TriangleAdornment({ outline: false }),
          );
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-circle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new CircleAdornment({ outline: false }));
          object.line.setStartAdornment(
            new CircleAdornment({ outline: false }),
          );
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-circle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new CircleAdornment({ outline: true }));
          object.line.setStartAdornment(new CircleAdornment({ outline: true }));
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-rhombus': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new RhombusAdornment({ outline: true }));
          object.line.setStartAdornment(
            new RhombusAdornment({ outline: true }),
          );
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-square': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new SquareAdornment({ outline: true }));
          object.line.setStartAdornment(new SquareAdornment({ outline: true }));
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-rhombus': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new RhombusAdornment({ outline: false }));
          object.line.setStartAdornment(
            new RhombusAdornment({ outline: false }),
          );
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-square': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(new SquareAdornment({ outline: false }));
          object.line.setStartAdornment(
            new SquareAdornment({ outline: false }),
          );
          addObjectToActivePage(object);
          return;
        }
      }
    },
    [addObjectToActivePage],
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
