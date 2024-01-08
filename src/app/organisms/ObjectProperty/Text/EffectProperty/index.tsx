import { Button } from '@/app/atoms/Button';
import {
  MoveableTextObject,
  MoveableTextShadow,
  MoveableTextStyleEffect,
} from '@/app/factories/MoveableText';
import { useUpdateActiveMoveableObjectTextStyleEffectCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { ShadowEffectOptions } from './ShadowEffectOption';
import { LiftEffectOptions } from './LiftEffectOption';

const TEXT_EFFECTS_STYLES: {
  id: MoveableTextStyleEffect;
  name: string;
  imgUrl: string;
  options?: FC;
  effectFn?: Function;
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
    options: ShadowEffectOptions,
    effectFn: (
      activeText: MoveableTextObject,
      {
        textShadow,
        setTextShadow,
      }: { textShadow?: MoveableTextShadow; setTextShadow: Function },
    ) => {
      const el = activeText?.getElement();
      if (!el) return;
      const val = textShadow
        ? textShadow
        : {
            color: '#000',
            offset: 50,
            direction: 45,
            blur: 0,
            transparency: 40,
          };
      setTextShadow(val);
      activeText?.setTextShadow(val);
    },
  },
  {
    id: 'lift',
    name: 'Lift',
    imgUrl: '/text-effects/styles/lift.webp',
    options: LiftEffectOptions,
    effectFn: (
      activeText: MoveableTextObject,
      {
        textIntensity,
        setTextIntensity,
      }: { textIntensity?: number; setTextIntensity: Function },
    ) => {
      const intensity = textIntensity ?? 50;
      setTextIntensity(intensity);
    },
  },
  {
    id: 'hollow',
    name: 'Hollow',
    imgUrl: '/text-effects/styles/hollow.webp',
  },
  {
    id: 'emboss',
    name: 'Splice',
    imgUrl: '/text-effects/styles/splice.webp',
  },
  {
    id: 'outline',
    name: 'Outline',
    imgUrl: '/text-effects/styles/outline.webp',
  },
  {
    id: 'echo',
    name: 'Echo',
    imgUrl: '/text-effects/styles/echo.webp',
  },
  {
    id: 'glitch',
    name: 'Glitch',
    imgUrl: '/text-effects/styles/glitch.webp',
  },
  {
    id: 'neon',
    name: 'Neon',
    imgUrl: '/text-effects/styles/neon.webp',
  },
  {
    id: 'background',
    name: 'Background',
    imgUrl: '/text-effects/styles/background.webp',
  },
];

interface SpacingPropertyProps {}

export const EffectProperty: FC<SpacingPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const [effectStyle, setEffectStyle] = useState<MoveableTextStyleEffect>(
    activeText?.getTextStyleEffect() || 'none',
  );
  const [textShadow, setTextShadow] = useState<MoveableTextShadow | undefined>(
    activeText?.getTextShadow(),
  );
  const [textIntensity, setTextIntensity] = useState();
  const updateActiveMoveableObjectTextStyleEffect = useUpdateActiveMoveableObjectTextStyleEffectCommand();
  useEffect(() => {
    if (textIntensity) {
      activeText?.setEffectLift(textIntensity);
    }
  }, [textIntensity]);
  return (
    <div className="w-full h-full overflow-auto">
      <div className="text-center mb-3">
        <span>Effects</span>
      </div>
      <p className="mb-[12px]">Style</p>
      <div className="flex gap-2 items-center overflow-auto">
        {TEXT_EFFECTS_STYLES.map(style => (
          <div className="effect-styles" key={style.id}>
            <div
              className="group flex flex-col flex-1 gap-1 items-center w-[60px] cursor-pointer"
              onClick={() => {
                updateActiveMoveableObjectTextStyleEffect(style.id, () => {
                  setEffectStyle(style.id);
                  if (style.effectFn) {
                    style.effectFn(activeText, {
                      textShadow,
                      setTextShadow,
                      textIntensity,
                      setTextIntensity,
                    });
                  }
                });
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
      {TEXT_EFFECTS_STYLES.map(style => {
        if (style.id !== effectStyle || !style.options) return null;
        return (
          <div key={style.id} className="effect-options font-light text-[14px]">
            <style.options shadow={textShadow} insensity={textIntensity} />
          </div>
        );
      })}
    </div>
  );
};
