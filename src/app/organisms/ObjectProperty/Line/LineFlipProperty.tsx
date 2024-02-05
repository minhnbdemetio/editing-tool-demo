import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { SvgFlip } from '@/app/utilities/svg-line';
import { twMerge } from '@/app/utilities/tailwind';
import { FC, useState } from 'react';

export const LineFlipProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [] = useState();

  if (!activeLineObject) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              activeLineObject.line.flip(SvgFlip.HORIZONTAL);
              activeLineObject.updateUI();
              activeLineObject.updatePointerControllerUI();
              activeLineObject.updateHeadControl();
            }}
            className={twMerge(
              'border-px border-solid border-gray-500 rounded-md px-3 py-3',
            )}
          >
            Flip horizontal
          </button>
          <button
            onClick={() => {
              activeLineObject.line.flip(SvgFlip.VERTICAL);
              activeLineObject.updateUI();
              activeLineObject.updatePointerControllerUI();
              activeLineObject.updateHeadControl();
            }}
            className={twMerge(
              'border-px border-solid border-gray-500 rounded-md px-3 py-3',
            )}
          >
            Flip vertical
          </button>
        </div>
      </div>
    </>
  );
};
