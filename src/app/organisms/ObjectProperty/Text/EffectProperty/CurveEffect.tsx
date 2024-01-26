import {
  useActiveTextObject,
  useUpdateTextShapeEffectOptions,
} from '@/app/hooks/useActiveMoveableObject';
import { TEXT_CURVE_DEFAULT_VALUE } from '@/app/lib/moveable/constant/text';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

export const CurveEffect: FC = () => {
  const activeText = useActiveTextObject();
  const [curve, setCurve] = useState<number | undefined>(
    activeText?.shapeEffect?.getOptions()?.curve ||
      TEXT_CURVE_DEFAULT_VALUE.curve,
  );
  const updateTextShapeEffectOptions = useUpdateTextShapeEffectOptions();
  return (
    <Slider
      label="Thickness"
      size="sm"
      step={1}
      maxValue={90}
      minValue={-90}
      color="foreground"
      classNames={{
        label: 'mt-[12px]',
      }}
      renderValue={({ children, ...props }) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              aria-label="Temperature value"
              value={curve}
              onChange={e => {
                const v = +e.target.value;
                if (isNaN(v)) return;
                updateTextShapeEffectOptions({ curve: v }, () => setCurve(v));
              }}
            />
          </Tooltip>
        </output>
      )}
      value={curve}
      onChange={value => {
        if (typeof value === 'number') {
          updateTextShapeEffectOptions({ curve: value }, () => setCurve(value));
        }
      }}
    />
  );
};
