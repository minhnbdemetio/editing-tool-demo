import React, { useCallback } from 'react';
import { Items, LineType } from './items';
import Image from 'next/image';

import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveableLineObject } from '@/app/lib/moveable/MoveableLine';
import {
  StrokeDashArraySizes,
  SvgLineAdornment,
} from '@/app/utilities/line/Interface.Line';

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
                startAdornment: SvgLineAdornment.Arrow,
                endAdornment: SvgLineAdornment.Arrow,
              },
            }),
          );
          return;
        }
        case 'closed': {
          addObjectToActivePage(
            new MoveableLineObject({
              svgLineOptions: {
                startAdornment: SvgLineAdornment.Line,
                endAdornment: SvgLineAdornment.Line,
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
          object.line.setStartAdornment(SvgLineAdornment.Triangle);
          object.line.setEndAdornment(SvgLineAdornment.Triangle);
          addObjectToActivePage(object);
          return;
        }
        case 'dots-end-arrow': {
          const object = new MoveableLineObject();
          object.line.setStrokeDashArray(StrokeDashArraySizes.Small);
          object.line.setEndAdornment(SvgLineAdornment.Arrow);
          addObjectToActivePage(object);
          return;
        }
        case 'end-arrow': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.Arrow);
          addObjectToActivePage(object);
          return;
        }
        case 'end-triangle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.Triangle);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-circle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.Circle);
          object.line.setStartAdornment(SvgLineAdornment.Circle);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-circle': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.OutlinedCircle);
          object.line.setStartAdornment(SvgLineAdornment.OutlinedCircle);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-rhombus': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.OutlinedRhombus);
          object.line.setStartAdornment(SvgLineAdornment.OutlinedRhombus);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-outline-square': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.OutlinedSquare);
          object.line.setStartAdornment(SvgLineAdornment.OutlinedSquare);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-rhombus': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.Rhombus);
          object.line.setStartAdornment(SvgLineAdornment.Rhombus);
          addObjectToActivePage(object);
          return;
        }
        case 'line-closed-square': {
          const object = new MoveableLineObject();
          object.line.setEndAdornment(SvgLineAdornment.Square);
          object.line.setStartAdornment(SvgLineAdornment.Square);
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
