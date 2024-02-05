import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { DotsLineStyle } from '@/app/icons/DotsLineStyle';
import { LineStartArrow } from '@/app/icons/LineStartArrow';
import { LineStartCircle } from '@/app/icons/LineStartCircle';
import { LineStartNone } from '@/app/icons/LineStartNone';
import { LineStartOutlinedCircle } from '@/app/icons/LineStartOutlinedCircle';
import { LineStartOutlinedRhombus } from '@/app/icons/LineStartOutlinedRhombus';
import { LineStartOutlinedSquare } from '@/app/icons/LineStartOutlinedSquare';
import { LineStartRect } from '@/app/icons/LineStartRect';
import { LineStartRhombus } from '@/app/icons/LineStartRhombus';
import { LineStartSquare } from '@/app/icons/LineStartSquare';
import { LineStartTriangle } from '@/app/icons/LineStartTriangle';
import { MediumDashedLineStyle } from '@/app/icons/MediumDashedLineStyle';
import { SmallDashedLineStyle } from '@/app/icons/SmallDashedLineStyle';
import { SolidLineStyle } from '@/app/icons/SolidLineStyle';
import { IconProps } from '@/app/types';
import { SvgLineAdornment } from '@/app/utilities/line/Interface.Line';
import { twMerge } from '@/app/utilities/tailwind';
import { FC, useCallback, useState } from 'react';

const LINE_STARTS: {
  icon: React.FC<IconProps>;
  id: SvgLineAdornment;
}[] = [
  {
    id: SvgLineAdornment.None,
    icon: LineStartNone,
  },
  {
    id: SvgLineAdornment.Line,
    icon: LineStartRect,
  },
  {
    id: SvgLineAdornment.Arrow,
    icon: LineStartArrow,
  },
  {
    id: SvgLineAdornment.Triangle,
    icon: LineStartTriangle,
  },
  {
    id: SvgLineAdornment.OutlinedCircle,
    icon: LineStartOutlinedCircle,
  },
  {
    id: SvgLineAdornment.Circle,
    icon: LineStartCircle,
  },
  {
    id: SvgLineAdornment.OutlinedSquare,
    icon: LineStartOutlinedSquare,
  },
  {
    id: SvgLineAdornment.Square,
    icon: LineStartSquare,
  },
  {
    id: SvgLineAdornment.OutlinedRhombus,
    icon: LineStartOutlinedRhombus,
  },
  {
    id: SvgLineAdornment.Rhombus,
    icon: LineStartRhombus,
  },
];

export const LineStartProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [lineStart, setLineStart] = useState<SvgLineAdornment>(
    activeLineObject?.line.getStartAdornment() || SvgLineAdornment.None,
  );

  const [] = useState();

  const onChangeStrokeDashArray = useCallback(
    (adornment: SvgLineAdornment) => {
      setLineStart(adornment);

      activeLineObject?.line.setStartAdornment(adornment);
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <div className="flex gap-2">
          {LINE_STARTS.map(({ icon: Icon, id }) => (
            <button
              key={id}
              onClick={() => onChangeStrokeDashArray(id)}
              className={twMerge(
                'border-px border-solid border-gray-500 rounded-md px-3 py-3',
                { 'border-green-400': id === lineStart },
              )}
            >
              <Icon className="mx-auto " />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
