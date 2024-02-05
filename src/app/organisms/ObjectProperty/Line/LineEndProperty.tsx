import { ListLineAdornmentButtons } from '@/app/atoms/ListLineAdornmentButtons';
import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
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
import { IconProps } from '@/app/types';
import { SvgLineAdornment } from '@/app/utilities/line/Interface.Line';
import { Adornment } from '@/app/utilities/line/adornment/Adornment';

import { twMerge } from '@/app/utilities/tailwind';
import { FC, useCallback, useState } from 'react';

const LINE_ENDS: {
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

export const LineEndProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [lineEnd, setLineEnd] = useState<Adornment | undefined>(
    activeLineObject?.line.getStartAdornment(),
  );
  const [] = useState();

  const changeAdornment = useCallback(
    (adornment: Adornment | undefined) => {
      setLineEnd(adornment);

      activeLineObject?.line.setEndAdornment(adornment);
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <ListLineAdornmentButtons
        adornment={lineEnd}
        onChange={changeAdornment}
        position="end"
      />
    </>
  );
};
