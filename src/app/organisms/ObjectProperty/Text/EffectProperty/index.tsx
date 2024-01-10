import { Button } from '@/app/atoms/Button';
import { MoveableTextStyleEffect } from '@/app/factories/MoveableText';
import { useUpdateActiveMoveableObjectTextStyleEffectCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { ShadowEffect } from './ShadowEffect';
import { LiftEffect } from './LiftEffect';
import { HollowEffect } from './HollowEffect';
import { SpliceEffect } from './SpliceEffect';
import { OutlineEffect } from './OutlineEffect';
import { EchoEffect } from './EchoEffect';
import { GlitchEffect } from './GlitchEffect';
import { NeonEffect } from './NeonEffect';
import { BackGroundEffect } from './BackgroundEffect';

const TEXT_EFFECTS_STYLES: {
  id: MoveableTextStyleEffect;
  name: string;
  imgUrl: string;
  effectComponent?: FC;
}[] = [
  {
    id: 'none',
    name: 'None',
    imgUrl: '/text-effects/styles/none.webp',
  },
  {
    id: 'shadow',
    name: 'Shadow',
    imgUrl: '/text-effects/styles/shadow.webp',
    effectComponent: ShadowEffect,
  },
  {
    id: 'lift',
    name: 'Lift',
    imgUrl: '/text-effects/styles/lift.webp',
    effectComponent: LiftEffect,
  },
  {
    id: 'hollow',
    name: 'Hollow',
    imgUrl: '/text-effects/styles/hollow.webp',
    effectComponent: HollowEffect,
  },
  {
    id: 'emboss',
    name: 'Splice',
    imgUrl: '/text-effects/styles/splice.webp',
    effectComponent: SpliceEffect,
  },
  {
    id: 'outline',
    name: 'Outline',
    imgUrl: '/text-effects/styles/outline.webp',
    effectComponent: OutlineEffect,
  },
  {
    id: 'echo',
    name: 'Echo',
    imgUrl: '/text-effects/styles/echo.webp',
    effectComponent: EchoEffect,
  },
  {
    id: 'glitch',
    name: 'Glitch',
    imgUrl: '/text-effects/styles/glitch.webp',
    effectComponent: GlitchEffect,
  },
  {
    id: 'neon',
    name: 'Neon',
    imgUrl: '/text-effects/styles/neon.webp',
    effectComponent: NeonEffect,
  },
  {
    id: 'background',
    name: 'Background',
    imgUrl: '/text-effects/styles/background.webp',
    effectComponent: BackGroundEffect,
  },
];

interface SpacingPropertyProps {}

export const EffectProperty: FC<SpacingPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const [effectStyle, setEffectStyle] = useState<MoveableTextStyleEffect>(
    activeText?.getTextStyleEffect() || 'none',
  );

  const renderEffectComponent = () => {
    const EffectOptions = TEXT_EFFECTS_STYLES.find(
      style => style.id === effectStyle,
    )?.effectComponent;
    if (!EffectOptions) return <></>;
    return <EffectOptions />;
  };

  const updateActiveMoveableObjectTextStyleEffect = useUpdateActiveMoveableObjectTextStyleEffectCommand();
  return (
    <div className="w-full h-full overflow-auto">
      <div className="text-center mb-3">
        <span>Effects</span>
      </div>
      <p className="mb-[12px]">Style</p>
      <div className="flex gap-2 items-center flex-wrap">
        {TEXT_EFFECTS_STYLES.map(style => (
          <div className="effect-styles" key={style.id}>
            <div
              className="group flex flex-col flex-1 gap-1 items-center w-[60px] cursor-pointer"
              onClick={() => {
                updateActiveMoveableObjectTextStyleEffect(style.id, () =>
                  setEffectStyle(style.id),
                );
              }}
            >
              <Image
                className={clsx('border', {
                  'border-gray-300': effectStyle !== style.id,
                  'border-blue-500': effectStyle === style.id,
                })}
                width={60}
                alt={style.name}
                src={style.imgUrl}
                radius="sm"
                style={{ maxWidth: '60px' }}
              />
              <p className="text-center font-light text-[10px]">
                <span>{style.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="effect-options font-light text-[14px]">
        {renderEffectComponent()}
      </div>
    </div>
  );
};
