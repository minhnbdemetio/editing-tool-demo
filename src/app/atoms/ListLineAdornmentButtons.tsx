import React from 'react';
import { twMerge } from '../utilities/tailwind';
import { Adornment } from '../utilities/line/adornment/Adornment';
import { LineStartNone } from '../icons/LineStartNone';
import { LineStartRect } from '../icons/LineStartRect';
import { LineAdornment } from '../utilities/line/adornment/LineAdornment';
import { LineStartArrow } from '../icons/LineStartArrow';
import { ArrowAdornment } from '../utilities/line/adornment/ArrowAdornment';
import { LineStartTriangle } from '../icons/LineStartTriangle';
import { TriangleAdornment } from '../utilities/line/adornment/TriangleAdornment';
import { LineStartOutlinedCircle } from '../icons/LineStartOutlinedCircle';
import { CircleAdornment } from '../utilities/line/adornment/CircleAdornment';
import { LineStartCircle } from '../icons/LineStartCircle';
import { SquareAdornment } from '../utilities/line/adornment/SquareAdornment';
import { LineStartOutlinedSquare } from '../icons/LineStartOutlinedSquare';
import { LineStartSquare } from '../icons/LineStartSquare';
import { RhombusAdornment } from '../utilities/line/adornment/RhombusAdornment';
import { LineStartOutlinedRhombus } from '../icons/LineStartOutlinedRhombus';
import { LineStartRhombus } from '../icons/LineStartRhombus';

interface IListLineAdornmentButtonsProps {
  adornment: undefined | Adornment;
  position?: 'start' | 'end';
  onChange: (Adornment: Adornment | undefined) => void;
}

export const ListLineAdornmentButtons: React.FC<
  IListLineAdornmentButtonsProps
> = ({ adornment, onChange, position = 'start' }) => {
  return (
    <>
      <div className="overflow-y-auto">
        <div className="flex gap-2">
          <button
            onClick={() => onChange(undefined)}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400': !adornment,
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartNone className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new LineAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment && adornment instanceof LineAdornment,
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartRect className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new ArrowAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment && adornment instanceof ArrowAdornment,
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartArrow className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new TriangleAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment && adornment instanceof TriangleAdornment,
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartTriangle className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new CircleAdornment({ outline: true }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof CircleAdornment &&
                  adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartOutlinedCircle className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new CircleAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof CircleAdornment &&
                  !adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartCircle className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new SquareAdornment({ outline: true }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof SquareAdornment &&
                  adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartOutlinedSquare className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new SquareAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof SquareAdornment &&
                  !adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartSquare className="mx-auto " />
          </button>

          <button
            onClick={() => onChange(new RhombusAdornment({ outline: true }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof RhombusAdornment &&
                  adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartOutlinedRhombus className="mx-auto " />
          </button>
          <button
            onClick={() => onChange(new RhombusAdornment({ outline: false }))}
            className={twMerge(
              'border-px border-solid  border-gray-500 rounded-md px-3 py-3',
              {
                'border-green-400':
                  adornment &&
                  adornment instanceof RhombusAdornment &&
                  !adornment.getOutline(),
                'rotate-180': position === 'end',
              },
            )}
          >
            <LineStartRhombus className="mx-auto " />
          </button>
        </div>
      </div>
    </>
  );
};
