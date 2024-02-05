import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { LineTypeElbowed } from '@/app/icons/LineTypeElbowed';
import { LineTypeStraight } from '@/app/icons/LineTypeStraight';
import { useForceReloadLineController } from '@/app/store/force-reload-line-controller';
import { IconProps } from '@/app/types';
import { SvgLineType } from '@/app/utilities/line/Interface.Line';
import { twMerge } from '@/app/utilities/tailwind';
import { FC, useCallback, useState } from 'react';

const LINE_TYPES: {
  icon: React.FC<IconProps>;
  id: SvgLineType;
}[] = [
  {
    id: SvgLineType.Straight,
    icon: LineTypeStraight,
  },
  {
    id: SvgLineType.Elbowed,
    icon: LineTypeElbowed,
  },
];

export const LineTypeProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const reload = useForceReloadLineController(s => s.reload);

  const [lineType, setLineType] = useState<SvgLineType>(
    activeLineObject?.line.getType() || SvgLineType.Straight,
  );

  const [] = useState();

  const onChangeStrokeDashArray = useCallback(
    (type: SvgLineType) => {
      setLineType(type);

      if (type === SvgLineType.Straight) {
        activeLineObject?.line.toStraight();
      } else if (type === SvgLineType.Elbowed) {
        activeLineObject?.line.toElbowed();
      }
      activeLineObject?.updateUI();
      reload();
    },
    [activeLineObject, reload],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <div className="flex gap-2 justify-center">
          {LINE_TYPES.map(({ icon: Icon, id }) => (
            <button
              key={id}
              onClick={() => onChangeStrokeDashArray(id)}
              className={twMerge(
                'border-px border-solid border-gray-500 rounded-md px-3 py-3',
                { 'border-green-400': id === lineType },
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
