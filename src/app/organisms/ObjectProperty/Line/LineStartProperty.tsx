import { ListLineAdornmentButtons } from '@/app/atoms/ListLineAdornmentButtons';
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
import { Adornment } from '@/app/utilities/line/adornment/Adornment';
import { twMerge } from '@/app/utilities/tailwind';
import { FC, useCallback, useState } from 'react';

export const LineStartProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [lineStart, setLineStart] = useState<Adornment | undefined>(
    activeLineObject?.line.getStartAdornment(),
  );

  const [] = useState();

  const changeAdornment = useCallback(
    (adornment: Adornment | undefined) => {
      setLineStart(adornment);

      activeLineObject?.line.setStartAdornment(adornment);
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <ListLineAdornmentButtons
        adornment={lineStart}
        onChange={changeAdornment}
      />
    </>
  );
};
