import React, { useCallback } from 'react';
import { Items, LineType } from './items';
import Image from 'next/image';
import { useActivePageCanvas } from '@/app/hooks/useActivePage';
import {
  createDashedLine,
  createDotsLine,
  createSolidLine,
  withEndArrow,
  withEndCircle,
  widthEndTriangle,
  withStartArrow,
  widthStartTriangle,
  withStartCircle,
  withEndOutlineCircle,
  withStartOutlineCircle,
  withStartOutlineSquare,
  withEndOutlineSquare,
  withStartSquare,
  withEndSquare,
  withEndRhombus,
  withStartRhombus,
  withEndOutlineRhombus,
  withStartOutlineRhombus,
  withStartLine,
  withEndLine,
} from '@/app/utilities/line';

import { useExecuteCommand } from '@/app/hooks/editor-commands/useCommand';
import { useCurrentPageObjects } from '@/app/hooks/usePageObjects';
import { MoveableLineObject } from '@/app/factories/MoveableLine';

interface LinesProps {}

export const Lines: React.FC<LinesProps> = () => {
  const canvas = useActivePageCanvas();
  const [objects, setObjects] = useCurrentPageObjects();

  const handleClick = useCallback(
    (type: LineType) => {
      switch (type) {
        case 'solid': {
          const line = new MoveableLineObject();
          setObjects([...objects, line]);

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
        case 'end-triangle': {
          if (canvas) {
            const line = widthEndTriangle(
              createSolidLine([100, 100, 150, 100], {
                stroke: 'red',
              }),
              canvas,
            );

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'dots-end-arrow': {
          if (canvas) {
            const line = createDotsLine([20, 20, 100, 20], {
              stroke: 'red',
            });
            canvas?.add(line);
            withEndArrow(line, canvas);

            canvas?.renderAll();

            canvas.renderAll();
          }
          return;
        }
        case 'dots-closed-triangle': {
          if (canvas) {
            const line = createDotsLine([20, 20, 100, 20], {
              stroke: 'red',
            });
            canvas?.add(line);

            widthEndTriangle(line, canvas);
            widthStartTriangle(line, canvas);

            canvas?.renderAll();
          }
          return;
        }
        case 'arrow-closed': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndArrow(line, canvas);
            withStartArrow(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'end-arrow': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndArrow(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-circle': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndCircle(line, canvas);
            withStartCircle(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-outline-circle': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndOutlineCircle(line, canvas);
            withStartOutlineCircle(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-outline-square': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withStartOutlineSquare(line, canvas);
            withEndOutlineSquare(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-square': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withStartSquare(line, canvas);
            withEndSquare(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-rhombus': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndRhombus(line, canvas);
            withStartRhombus(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'line-closed-outline-rhombus': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withEndOutlineRhombus(line, canvas);
            withStartOutlineRhombus(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
        case 'closed': {
          if (canvas) {
            const line = createSolidLine([20, 20, 100, 20], {
              stroke: 'red',
            });

            withStartLine(line, canvas);
            withEndLine(line, canvas);

            canvas?.add(line);
            canvas?.renderAll();
          }
          return;
        }
      }
    },
    [canvas],
  );

  const handleClickCommand = useExecuteCommand(handleClick);

  return (
    <div>
      <p className="text-md font-normal text-[600] text-black-500">Lines</p>

      <div className="mt-1 grid grid-cols-5 gap-1">
        {Items.map(item => (
          <div
            onClick={() => handleClickCommand(item.type)}
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
